import style from './header.module.css'
import Link from 'next/link'
import Image from 'next/image'

const Header = () => {
  return (
    <div className={style.header}>

        <div className={style.logo}>
            <Link href="/">
                <Image src='/logo.png' width={200} height={200} alt='logo' />
                <h4>MyNoteApp</h4>
            </Link>
        </div>

        <div className={style.rightBar}>

           <button>
                Hello ! 👋
           </button>

        </div>

    </div>
  )
}

export default Header