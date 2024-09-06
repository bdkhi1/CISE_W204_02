export type Article = {
    _id?: string;
    title?: string;
    authors?: string;
    source?: string;
    pubyear?: string;
    doi?: string;
    claim?: string;
    evidence?: string;
};

// Default empty values for the Article type
export const DefaultEmptyArticle: Article = {
    _id: undefined,
    title: '',
    authors: '',
    source: '',
    pubyear: '',
    doi: '',
    claim: '',
    evidence: '',
};
