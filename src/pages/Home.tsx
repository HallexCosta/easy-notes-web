import { ChangeEvent, useEffect, useState } from 'react'

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

type NoteCardDetailProps = {
  title: string
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
  const [showModal, setShowModal] = useState<boolean>(false)

  const [selectedCardData, setSelectedCardData] = useState<NoteCardDomain>({
    title: '',
    description:  '',
    created_at: new Date(),
    updated_at: new Date()
  })

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
        <button {...props} className={selected ? 'selected' : ''} onClick={handleOpenModal}>
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

  const NoteCardDetail = (props: NoteCardDetailProps) =>  {
    function handleOnChangeDescription(event: ChangeEvent<HTMLTextAreaElement>) {
      setSelectedCardData({
          ...selectedCardData,
          description: event.target.value
      })
      setNoteDetailStatus('editing')
    }

    return (
      <div className="text-area">
        <h2>{props.title}</h2>

        <textarea
          key={Date.now()}
          value={props.description}
          onChange={handleOnChangeDescription}
        />
      </div>
    )
  }

  const Modal = (props: {show: boolean}) => {
    const [newCardTitle, setNewCardTitle] = useState<string>('')
    const [newCardDescription, setNewCardDescription] = useState<string>('')
   
    useEffect(() => {
      // if not exists value in title or description
      // save card title and card description
      if (newCardTitle !== '' || newCardDescription !== '') {
      }
      // card title start and card description start
        setNewCardTitle(localStorage.getItem('modal-field-title') || '')
        setNewCardDescription(localStorage.getItem('modal-field-description') || '')
    }, [])

    function handleAddCard(card: NoteCardDomain){
      setCardsData(cards => {
        cards.unshift(card)
        return cards
      })
      setSelectedCardIndex(0)
      setSelectedCardData(card)
      setShowModal(false)

      // clear local storage after save new notes
      localStorage.setItem('modal-field-title', '')
      localStorage.setItem('modal-field-description', '')
    }
    function handleOnChangeTitle(text: string) {
      setNewCardTitle(text)
    }
    function handleOnChangeDescription(text: string) {
      setNewCardDescription(text)
    }
    function handleCloseModal() {
      localStorage.setItem('modal-field-title', newCardTitle)
      localStorage.setItem('modal-field-description', newCardDescription)
      setShowModal(false)
    }

    return !props.show ? null : (
      <div className="modal">
        <div className="modal-content">
          <header>
            <h3>Criar novo card</h3>
          </header>

          <main>
              <label>Card title</label>
              <input 
                type="text"
                name="title"
                id="title"
                onChange={e => handleOnChangeTitle(e.target.value)}
                value={newCardTitle}
              />

              <label>Card description</label>
              <textarea
                onChange={e => handleOnChangeDescription(e.target.value)}
                value={newCardDescription}
              />
          </main>

          <footer>
            <button onClick={handleAddCard.bind(null, {
              title: newCardTitle,
              description: newCardDescription,
              created_at: new Date(),
              updated_at: new Date(),
            })}>Adicionar</button>
            <button onClick={() => handleCloseModal()}>Cancelar</button>
          </footer>
        </div>
      </div>
    )
  }
  

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

  function handleOpenModal() {
    setShowModal(true)
  }

  return (
    <>
      <Modal show={showModal} />

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
            />
          )}
        </section>
      </div>
    </>
  )
}
