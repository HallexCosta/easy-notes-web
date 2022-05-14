import { useState } from 'react'

import ViewListIcon from '../components/icons/viewListIcon'
import DeleteNoteIcon from '../components/icons/deleteNoteIcon'
import AddNoteIcon from '../components/icons/addNoteIcon'
import FavoriteNoteIcon from '../components/icons/favoriteNoteIcon'

import CirclePeopleIcon from '../components/icons/circlePeopleIcon'
import SendIcon from '../components/icons/sendIcon'

import '../assets/styles/home.css'

type NoteCardParams = React.HTMLAttributes<HTMLDivElement> & {
  position: number
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
  const [selectedCard, setSelelectedCard] = useState<number>(0)
  const [selectedButton, setSelelectedButton] = useState<string>()

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
        <button>
          <DeleteNoteIcon />
        </button>
      )
    }
  ]

  const Separator = () => (
    <div className="separator" />
  )

  const NoteCard = (params: NoteCardParams) => (
    <div
      onClick={params.onClick}
      className={`note-card-container ${
      /*select the card that was clicked*/
      selectedCard === params.position
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
    setSelelectedButton(buttonName)
  }

  function handleChangeCardColor(cardId: number, event: any) {
    console.log('select card', cardId, event)
    setSelelectedCard(cardId)
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
          {(Array.from(Array(10).keys())
            .map(
              index => 
                <>
                  <NoteCard 
                    key={`card ${index}`} 
                    position={Number(index)}
                    title="Some random idea"
                    date="now"
                    description="lorem ipsum is a decoreted a number string bolean and tibia yes."
                    onClick={handleChangeCardColor.bind(null, index)}
                  />
                  <Separator key={index}/>
                </>
            ))}
        </section>

        <section className="note-detail">
          <nav>
            {noteDetailButton.map(
              ({name, renderIcon}) => renderIcon()
            )}
          </nav>

          <div
            className="text-area"
            contentEditable={true}
          />
        </section>
      </div>
  )
}
