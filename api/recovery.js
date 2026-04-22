// api/recovery.js
// Fetches today's recovery data from WHOOP API

export default async function handler(req, res) {
  const auth = req.headers.authorization;

  if (!auth || !auth.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const token = auth.split(' ')[1];

  try {
    // Get most recent recovery cycle
    const cycleRes = await fetch(
      'https://api.prod.whoop.com/developer/v1/cycle?limit=1',
      { headers: { Authorization: `Bearer ${token}` } }
    );

    if (!cycleRes.ok) throw new Error('Failed to fetch cycles');
    const cycles = await cycleRes.json();
    const cycleId = cycles.records?.[0]?.id;

    if (!cycleId) return res.status(404).json({ error: 'No cycle found' });

    // Get recovery for that cycle
    const recRes = await fetch(
      `https://api.prod.whoop.com/developer/v1/cycle/${cycleId}/recovery`,
      { headers: { Authorization: `Bearer ${token}` } }
    );

    if (!recRes.ok) throw new Error('Failed to fetch recovery');
    const recovery = await recRes.json();

    // Get latest sleep
    const sleepRes = await fetch(
      'https://api.prod.whoop.com/developer/v1/activity/sleep?limit=1',
      { headers: { Authorization: `Bearer ${token}` } }
    );

    let sleepPerformance = null;
    if (sleepRes.ok) {
      const sleepData = await sleepRes.json();
      sleepPerformance = sleepData.records?.[0]?.score?.sleep_performance_percentage ?? null;
    }

    res.status(200).json({
      recovery_score: recovery.score?.recovery_score ?? null,
      hrv_rmssd_milli: recovery.score?.hrv_rmssd_milli ?? null,
      resting_heart_rate: recovery.score?.resting_heart_rate ?? null,
      sleep_performance_percentage: sleepPerformance,
      strain: cycles.records?.[0]?.score?.strain ?? null,
      cycle_id: cycleId,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
}
