export interface Article {
    id: string;
    title: string;
    authors: string;
    pubyear: number;
    source: string | null;
    doi: string | null;
    practice: string | null;
    evidence: string | null;
    claim: string | null;
  }
  