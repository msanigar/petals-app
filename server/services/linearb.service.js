const config = require("../config");
const linearbRepository = require("../repositories/linearb.repository");

class LinearBService {
  async createMeasurementsReport(data) {
    const params = {
      requested_metrics: data.requestedMetrics,
      group_by: data.groupBy,
      roll_up: data.rollUp,
      time_ranges: data.timeRanges,
      repository_ids: data.repositoryIds,
      team_ids: data.teamIds,
      contributor_ids: data.contributorIds,
      service_ids: data.serviceIds,
      labels: data.labels,
      limit: data.limit,
      offset: data.offset,
      return_no_data: data.returnNoData,
    };
    return await linearbRepository.createMeasurementsReport(params);
  }

  async exportMeasurementsReport(data) {
    const params = {
      requested_metrics: data.requestedMetrics,
      group_by: data.groupBy,
      time_ranges: data.timeRanges,
      repository_ids: data.repositoryIds,
      team_ids: data.teamIds,
      contributor_ids: data.contributorIds,
      service_ids: data.serviceIds,
      limit: data.limit,
      offset: data.offset,
      return_no_data: data.returnNoData,
    };
    return await linearbRepository.exportMeasurementsReport(
      params,
      data.fileFormat
    );
  }

  async getDashboardMetricsByTeamAndTimeRange(teamId, timeRange) {
    const params = {
      requested_metrics: [
        {
          name: "branch.computed.cycle_time",
          agg: "p75",
        },
        {
          name: "branch.time_to_pr",
          agg: "avg",
        },
        {
          name: "branch.time_to_review",
          agg: "avg",
        },
        {
          name: "branch.review_time",
          agg: "avg",
        },
        {
          name: "pr.merged.size",
          agg: "avg",
        },
        {
          name: "pr.review_depth",
        },
        {
          name: "commit.activity.new_work.count",
        },
        {
          name: "commit.activity.refactor.count",
        },
        {
          name: "commit.activity.rework.count",
        },
        {
          name: "commit.total_changes",
        },
        {
          name: "pr.merged",
        },
        {
          name: "branch.state.active",
        },
        {
          name: "branch.time_to_approve",
          agg: "avg",
        },
        {
          name: "branch.time_to_merge",
          agg: "avg",
        },
      ],
      group_by: "organization",
      time_ranges: [timeRange],
      team_ids: teamId
        ? Object.keys(config.linearB.teamIds).reduce((acc, team) => {
            if (team === teamId) {
              acc.push(config.linearB.teamIds[team]);
            }
            return acc;
          }, [])
        : Object.values(config.linearB.teamIds),
    };
    return await linearbRepository.createMeasurementsReport(params);
  }
}

module.exports = new LinearBService();
