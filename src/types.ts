export type Anime = {
  id: string;
  index: string;
  title: string;
  hardHint: string;
  easyHint: string;
  acceptedAnswers: string[];
  youtubeUrl?: string;
};

export type Status = "new" | "correct" | "wrong";
