// Stats
import Stats from '../../../helpers/serverStats/ServerStats.js'

class DashboardStats {
    constructor() {
        this.get_stats()
    }

    async get_stats() {
        const server_stats = await Stats.get_stats()
        document.querySelector('#stats_total_rooms').innerText = server_stats['total_rooms_count']
        document.querySelector('#stats_total_users').innerText = server_stats['total_users_count']
    }
}

export default new DashboardStats()
