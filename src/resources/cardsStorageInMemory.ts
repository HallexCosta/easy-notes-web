export type NoteCardDomain = {
  title: string
  description: string
  created_at: Date
  updated_at: Date
}

const LENGTH_CARDS = 10
export const cardsMemory: NoteCardDomain[] = []

export default function requestCards(): NoteCardDomain[] {
  for (let i = 0; i < LENGTH_CARDS; i++) {
    cardsMemory.pop()
  }

  (Array.from(Array(LENGTH_CARDS).keys())).map(index => {
    cardsMemory.push({
      title: `Some random idea - ${index+1}`,
      description: `${index+1} - lorem ipsum is a decoreted a number string bolean and tibia yes.`,
      created_at: new Date(),
      updated_at: new Date()
    })
  })

  return cardsMemory
}
