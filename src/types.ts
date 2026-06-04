export type RecoveryReadinessTrack =
  | "AI_GOVERNANCE"
  | "IDENTITY"
  | "REVENUE_SYSTEMS"
  | "FINTECH"
  | "PROCUREMENT"
  | "BIOTECH";

export type RecoveryReadinessAction =
  | "BUILD_REDUNDANCY"
  | "ASSIGN_FALLBACK_OWNER"
  | "SHORTEN_RECOVERY"
  | "BUFFER_HANDOFFS";

export type RecoveryReadinessSeverity = "LOW" | "MEDIUM" | "HIGH";

export interface BoardDecisionRecoveryReadinessBriefItem {
  id: string;
  lane: string;
  track: RecoveryReadinessTrack;
  action: RecoveryReadinessAction;
  recoveryTheme: string;
  boardQuestion: string;
  owner: string;
  audience: string;
  currentPosture: string;
  readinessHeadline: string;
  recoverySignal: string;
  weakestFallback: string;
  recoveryMoves: string[];
  relatedSurfaces: string[];
  companyTags: string[];
  decisionHandoffs: number;
  recoveryHoursToRestore: number;
  escalationGaps: number;
  fallbackOwnerCoverageScore: number;
  pathRedundancyScore: number;
  boardConfidenceScore: number;
  valueAtStakeMillions: number;
  headline: string;
  narrative: string;
  nextMove: string;
}

export interface RecoveryReadinessAssessment {
  severity: RecoveryReadinessSeverity;
  ok: boolean;
  message: string;
}

export interface BoardDecisionRecoveryReadinessBriefReportItem extends BoardDecisionRecoveryReadinessBriefItem {
  handoffAssessment: RecoveryReadinessAssessment;
  restoreAssessment: RecoveryReadinessAssessment;
  escalationAssessment: RecoveryReadinessAssessment;
  fallbackOwnerAssessment: RecoveryReadinessAssessment;
  redundancyAssessment: RecoveryReadinessAssessment;
  confidenceAssessment: RecoveryReadinessAssessment;
  compositeRecoveryRiskScore: number;
}

export interface BoardDecisionRecoveryReadinessBriefSummary {
  items: number;
  constrainedLanes: number;
  recoveryPriorityLanes: number;
  averageBoardConfidence: number;
  valueAtStakeMillions: number;
  leadingMessage: string;
}

export interface BoardDecisionRecoveryReadinessBriefExport {
  generatedAt: string;
  summary: BoardDecisionRecoveryReadinessBriefSummary;
  items: BoardDecisionRecoveryReadinessBriefReportItem[];
}

export interface BoardDecisionRecoveryReadinessBriefPayload {
  report: BoardDecisionRecoveryReadinessBriefExport;
  recoveryLanes: ReturnType<typeof import("./services/verticalBriefService.js").recoveryLanes>;
  fallbackMap: ReturnType<typeof import("./services/verticalBriefService.js").fallbackMap>;
  recoveryPosture: ReturnType<typeof import("./services/verticalBriefService.js").recoveryPosture>;
  riskMap: ReturnType<typeof import("./services/verticalBriefService.js").riskMap>;
  verification: string[];
  sample: BoardDecisionRecoveryReadinessBriefItem[];
}
