import { useEffect, useState } from 'react'

import requestCards, { NoteCardDomain } from '../resources/cardsStorageInMemory'

import ViewListIcon from '../components/icons/viewListIcon'
import DeleteNoteIcon from '../components/icons/deleteNoteIcon'
import AddNoteIcon from '../components/icons/addNoteIcon'
import FavoriteNoteIcon from '../components/icons/favoriteNoteIcon'

import CirclePeopleIcon from '../components/icons/circlePeopleIcon'
import SendIcon from '../components/icons/sendIcon'

import '../assets/styles/home.css'

type NoteCardProps = React.HTMLAttributes<HTMLDivElement> & {
  position: number
  title: string
  date: string
  description: string
}
type NoteCardDetailProps = React.HTMLAttributes<HTMLDivElement> & {
  title: string
  date: string
  description: string
}

interface MenuButton extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  selected: boolean
}

type PrincipalMenuButton = {
  name: string
  selected: boolean
  renderIcon: React.FC<MenuButton>
}

export default function Home() {
  const [cardsData, setCardsData] = useState<NoteCardDomain[]>([])
  const [selectedCardData, setSelectedCardData] = useState<NoteCardDomain>()

  const [selectedCardIndex, setSelectedCardIndex] = useState<number>(0)
  const [selectedButton, setSelectedButton] = useState<string>()

  const [noteDetailStatus, setNoteDetailStatus] = useState<string>('saved')
  const [principalMenuButtons, setPrincipalMenuButtons]  = useState<PrincipalMenuButton[]>([
    {
      name: 'ListNotes',
      selected: true,
      renderIcon: ({ selected, ...props }) => (
        <button {...props} className={selected ? 'button-selected' : ''}>
          <ViewListIcon
            fill={selected ? '#0753B7' : ''}
          />
        </button>
      ),
    },
    {
      name: 'FavoriteNote',
      selected: false,
      renderIcon: ({ selected, ...props }) => (
        <button {...props} className={selected ? 'button-selected' : ''}>
          <FavoriteNoteIcon
            fill={selected ? '#0753B7' : ''}
          />
        </button>
      ),
    },
    {
      name: 'DeleteNote',
      selected: false,
      renderIcon: ({ selected, ...props }) => (
        <button {...props} className={selected ? 'button-selected' : ''}>
          <DeleteNoteIcon
            fill={selected ? '#0753B7' : ''}
          />
        </button>
      ),
    },
    {
      name: 'AddNote',
      selected: false,
      renderIcon: ({ selected, ...props }) => (
        <button {...props} className={selected ? 'selected' : ''}>
          <AddNoteIcon
            fill={selected ? '#0753B7' : ''}
          />
        </button>
      ),
    }
  ])

  function handleDeleteCard(cardIndex: number) {
    // remove card deleted from React.state
    setCardsData(currentCards => {
      return currentCards.filter((_, index) => {
        return cardIndex !== index
      })
    })

    // change content from main when delete a card
    const nextCardIndex = cardIndex + 1
    setSelectedCardData(cardsData[nextCardIndex])
  }
  const noteDetailButton = [
    {
      name: 'Send',
      renderIcon: () => (
        <button>
          <SendIcon />
        </button>
      )
    },
    {
      name: 'DeleteNote',
      renderIcon: () => (
        <button onClick={handleDeleteCard.bind(null, selectedCardIndex)}>
          <DeleteNoteIcon />
        </button>
      )
    }
  ]

  const Separator = () => (
    <div className="separator" />
  )

  const NoteCard = (params: NoteCardProps) => (
    <div
      onClick={params.onClick}
      className={`note-card-container ${
      /*select the card that was clicked*/
      selectedCardIndex === params.position
      ? 'note-card-selected'
      : ''}`}
    > 
      <header>
        <h3>{params.title}</h3>
        <label>{params.date}</label>
      </header>
    
      <p>{params.description}</p>
    </div>
  )

  const NoteCardDetail = (params: NoteCardDetailProps) => (
    <div className="text-area">
      <h2>{params.title}</h2>
      <textarea
        onChange={handleOnChangeNoteCardText}
      >{params.description}</textarea>
    </div>
  )
  

  useEffect(() => {
    const cards = requestCards()

    setCardsData(cards)
    setSelectedCardIndex(0)
    setSelectedCardData(cards[0])
  }, [])

  function handleChangeButtonColor(buttonName: string) {
    console.log('clicked', buttonName)
    principalMenuButtons.map(menuButton => {
      if (menuButton.name === buttonName) {
        menuButton.selected = true
        return menuButton
      }

      menuButton.selected = false
      return menuButton
    })
    setSelectedButton(buttonName)
  }

  function handleChangeCardColor(noteCard: NoteCardDomain, positionCard: number, event: any) {
    setSelectedCardIndex(positionCard)
    setSelectedCardData(noteCard)
  }

  function handleOnChangeNoteCardText() {
    setNoteDetailStatus('editing')
  }

  return (
      <div className="container">
        <nav>
          <div>
            {principalMenuButtons.map(
              ({ name, selected, renderIcon }) => renderIcon({
                onClick: handleChangeButtonColor.bind(null, name),
                selected
              })
            )}
          </div>

          <CirclePeopleIcon />
        </nav>

        <section className="notes-container">
          {cardsData.map(
             (card, index)=> 
              <>
                <NoteCard 
                  key={`card ${index}`} 
                  position={Number(index)}
                  title={card.title}
                  date="now"
                  description={card.description}
                  onClick={e => handleChangeCardColor(card, index, e)}
                />
                <Separator key={index}/>
              </>
            )}
        </section>

        <section className="note-detail">
          <nav>
            <div className="note-detail-buttons">
              {noteDetailButton.map(
                ({name, renderIcon}) => renderIcon()
              )}
            </div>

            <label>{noteDetailStatus}</label>

          </nav>

          {selectedCardData && (
            <NoteCardDetail
              title={selectedCardData.title}
              description={selectedCardData.description}
              date="now"
            />
          )}
        </section>
      </div>
  )
}
