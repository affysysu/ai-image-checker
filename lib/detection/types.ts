export type EngineName = 'self_model' | 'hugging_face' | 'sightengine' | 'metadata';

export type Verdict = 'real' | 'uncertain' | 'ai';

export type Confidence = 'low' | 'medium' | 'high';

export type EngineStatus = 'success' | 'timeout' | 'failed' | 'skipped';

export type EngineResult = {
  engine: EngineName;
  displayName: string;
  score: number;
  confidence: Confidence;
  status: EngineStatus;
  latencyMs: number;
  weight: number;
  errorCode?: string;
};

export type DetectionSource = {
  type: 'upload' | 'url';
  fileName?: string;
  url?: string;
  mimeType?: string;
  size?: number;
  imageBuffer?: ArrayBuffer;
};

export type DetectionSummary = {
  score: number;
  verdict: Verdict;
  confidence: Confidence;
  label: string;
  explanation: string;
};

export type DetectionResult = {
  id: string;
  createdAt: string;
  source: DetectionSource;
  summary: DetectionSummary;
  engines: EngineResult[];
  heatmap: {
    available: boolean;
    url?: string;
    message: string;
  };
  warnings: string[];
};

export type ValidationErrorCode =
  | 'UNSUPPORTED_FILE_TYPE'
  | 'FILE_TOO_LARGE'
  | 'INVALID_IMAGE_URL'
  | 'PRIVATE_IMAGE_URL';

export type ValidationResult =
  | { ok: true }
  | { ok: false; code: ValidationErrorCode; message: string };

export type ImageFileLike = {
  name: string;
  type: string;
  size: number;
};
