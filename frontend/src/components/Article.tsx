export type Article = {
    _id?: string;
    title?: string;
    isbn?: string;
    author?: string;
    description?: string;
    published_date?: Date;
    publisher?: string;
    updated_date?: Date;
};

export const DefaultEmptyArticle: Article = {
    _id: undefined, 
    title: '', 
    isbn: '',
    author: '',
    description: '',
    published_date: undefined,
    publisher: '',
    updated_date: undefined,
}
