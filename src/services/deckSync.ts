import {
  collection,
  doc,
  setDoc,
  deleteDoc,
  onSnapshot,
  query,
  where,
  Unsubscribe,
} from 'firebase/firestore';
import { db, auth, OperationType, handleFirestoreError } from '../firebase';
import { PitchDeck } from '../types/deck';

const PITCH_DECKS_COLLECTION = 'pitch_decks';

export function subscribeToUserDecks(
  userId: string,
  onUpdate: (decks: PitchDeck[]) => void,
  onError?: (error: Error) => void
): Unsubscribe {
  const q = query(
    collection(db, PITCH_DECKS_COLLECTION),
    where('ownerId', '==', userId)
  );

  return onSnapshot(
    q,
    (snapshot) => {
      const decks: PitchDeck[] = [];
      snapshot.forEach((d) => {
        const data = d.data() as PitchDeck;
        decks.push(data);
      });
      onUpdate(decks);
    },
    (error) => {
      try {
        handleFirestoreError(error, OperationType.GET, PITCH_DECKS_COLLECTION);
      } catch (handled) {
        if (onError && handled instanceof Error) {
          onError(handled);
        }
      }
    }
  );
}

export async function saveDeckToFirestore(deck: PitchDeck, userId: string): Promise<void> {
  const path = `${PITCH_DECKS_COLLECTION}/${deck.id}`;
  try {
    const payload = {
      ...deck,
      ownerId: userId,
      updatedAt: new Date().toISOString(),
    };
    await setDoc(doc(db, PITCH_DECKS_COLLECTION, deck.id), payload);
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, path);
  }
}

export async function deleteDeckFromFirestore(deckId: string): Promise<void> {
  const path = `${PITCH_DECKS_COLLECTION}/${deckId}`;
  try {
    await deleteDoc(doc(db, PITCH_DECKS_COLLECTION, deckId));
  } catch (error) {
    handleFirestoreError(error, OperationType.DELETE, path);
  }
}
