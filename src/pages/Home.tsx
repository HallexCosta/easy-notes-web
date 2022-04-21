import ViewListIcon from '../assets/icons/view-list-icon.svg'
import StarIcon from '../assets/icons/star-icon.svg'
import TrashIcon from '../assets/icons/trash-icon.svg'
import AddIcon from '../assets/icons/add-icon.svg'
import CirclePeopleIcon from '../assets/icons/circle-people-icon.svg'
import SendIcon from '../assets/icons/send-icon.svg'

import '../assets/styles/home.css'

type NoteCardParams = {
  title: string
  date: string
  description: string
}

export default function Home() {
  const principalMenuButtons = [
    {
      name: 'ViewListIcon',
      MenuButton: () => (
        <button>
          <img src={ViewListIcon} />
        </button>
      ),
    },
    {
      name: 'StarIcon',
      MenuButton: () => (
        <button>
          <img src={StarIcon} />
        </button>
      ),
    },
    {
      name: 'TrashIcon',
      MenuButton: () => (
        <button>
          <img src={TrashIcon} />
        </button>
      ),
    },
    {
      name: 'AddIcon',
      MenuButton: () => (
        <button>
          <img src={AddIcon} />
        </button>
      ),
    }
  ]

  const noteDetailButton = [
    {
      name: 'Send',
      Button: () => (
        <button>
          <img src={SendIcon} />
        </button>
      )
    },
    {
      name: 'Trash',
      Button: () => (
        <button>
          <img src={TrashIcon} />
        </button>
      )
    }
  ]

  const Separator = () => (
    <div className="separator" />
  )
  const NoteCard = (params: NoteCardParams) => (
    <div className="note-card-container"> 
      <header>
        <h3>{params.title}</h3>
        <label>{params.date}</label>
      </header>
    
      <p>{params.description}</p>
    </div>
  )

  return (
      <div className="container">
        <nav>
          <div>
          {principalMenuButtons.map(
              ({ name, MenuButton }) => <MenuButton key={name} />
           )}
          </div>

          <img src={CirclePeopleIcon} />
        </nav>

        <section className="notes-container">
          {(Array.from(Array(10).keys())
            .map(
              index => 
                <>
                  <NoteCard 
                    key={index} 
                    title="Some random idea"
                    date="now"
                    description="lorem ipsum is a decoreted a number string bolean and tibia yes."
                  />
                  <Separator key={index}/>
                </>
            ))}
        </section>

        <section className="note-detail">
          <nav>
            {noteDetailButton.map(
              ({name, Button}) => <Button key={name} />
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
