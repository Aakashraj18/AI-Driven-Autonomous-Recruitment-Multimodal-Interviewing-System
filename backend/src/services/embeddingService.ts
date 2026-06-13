/**
 * Embedding & Vector Search Service
 *
 * Handles:
 * - Generating vector embeddings from text (candidate profiles & JDs)
 * - Indexing embeddings in ChromaDB
 * - Performing cosine similarity search for candidate ranking
 *
 * Will be fully implemented in Step 5.
 */

// TODO: Implement in Step 5
export const generateEmbedding = async (_text: string): Promise<number[]> => {
  throw new Error("Not implemented yet — Step 5");
};

export const indexCandidate = async (
  _candidateId: string,
  _embedding: number[]
): Promise<void> => {
  throw new Error("Not implemented yet — Step 5");
};

export const searchSimilarCandidates = async (
  _jobEmbedding: number[],
  _topK: number
): Promise<any[]> => {
  throw new Error("Not implemented yet — Step 5");
};
