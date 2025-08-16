import './Footer.scss';
import logo from '../../shared/icons/logo.svg';

const Footer = () => {

	const buildNavItems = (items: {title: string, items: {label: string, href: string}[]}) => {
		return (
			<ul className="footer__nav-list">
				<span className="footer__nav-title">{items.title}</span>
				{items.items.map((item) => (
					<li key={item.label} className="footer__nav-item">
						<a href={item.href} className="footer__nav-link">
							{item.label}
						</a>	
					</li>
				))}
			</ul>
		)
	}

	return (
		<div className="footer">
			<div className="footer-content">
				<div className="footer__logo">
					<a href="/" className='footer__logo-link'>
						<img src={logo} alt="logo" />
						<span className='footer__logo-text'>RailWay</span>
					</a>
				</div>
				<div className="footer__nav">
					{buildNavItems({title: 'About', items: [{label: 'How it works', href: '/how-it-works'}, {label: 'Featured', href: '#'}, {label: 'Partnership', href: '#'}, {label: 'Bussiness Relation', href: '#'}]})}
					{buildNavItems({title: 'Community', items: [{label: 'Events', href: '/how-it-works'}, {label: 'Blog', href: '#'}, {label: 'Podcast', href: '/contact'}, {label: 'Invite a friend', href: '#'}]})}
					{buildNavItems({title: 'Social', items: [{label: 'Discord', href: '/how-it-works'}, {label: 'Instagram', href: '#'}, {label: 'Twitter', href: '/contact'}, {label: 'Facebook', href: '#'}]})}
				</div>
			</div>
			<div className="footer_copy">
			 	<span>©2025 RailWay.  All rights reserved</span>
			</div>
		</div>
	)
}

export default Footer;