type Category = 'technology' | 'art' | 'science' | 'cinema' | 'design' | 'food'

type Image = {
    url: string;
    public_url: string;
} | null

export interface Post {
    _id: string;
    title: string;
    content: string;
    image: Image;
    createdAt: string;
    category: Category;
    userId: string;
}