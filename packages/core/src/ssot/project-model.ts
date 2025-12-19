export type ProjectDomain = "general" | "commerce" | "event" | string;

export interface CatalogPin { catalogVersion: string; }

export interface ProjectModelV1 {
  id: string;
  workspaceId: string;
  name: string;
  domain: ProjectDomain;
  catalogPin: CatalogPin;
  pages: Array<{ id: string; name: string; rootNodeId: string }>;
  meta?: Record<string, unknown>;
}
