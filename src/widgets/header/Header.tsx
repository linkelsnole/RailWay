import logo from '../../shared/icons/logo.svg'
import './Header.scss'
import logoDark from '../../shared/icons/logo-black.svg'


const Header = ({ theme }: { theme: 'light' | 'dark' }) => {
	return (
		<div className={`header ${theme}`}>
			<div className="header__logo">
				{theme === 'light' ? (
					<>
						<a href="/" className='header__logo-link'>
							<img src={logo} alt="logo" />
							<span className='header__logo-text'>RailWay</span>
						</a>
				</>) : (
					<>
						<a href="/" className='header__logo-link'>
							<img src={logoDark} alt="logo" />
							<span className='header__logo-text'>RailWay</span>
						</a>
					</>
				)}
			</div>
			<nav className="header__nav">
				<ul className="header__nav-list">
					<li className={`header__nav-item ${theme === 'dark' ? 'dark' : 'light'}`}><a href="#">Mobile App</a></li>
					<li className={`header__nav-item ${theme === 'dark' ? 'dark' : 'light'}`}><a href="#">FAQs</a></li>
					<li className={`header__nav-item ${theme === 'dark' ? 'dark' : 'light'}`}><a href="#">Contact</a></li>
					<li className={`header__nav-item ${theme === 'dark' ? 'dark' : 'light'}`}><a href="#">Sign Up</a></li>
				</ul>
			</nav>
		</div>
	)
}

export default Header;