import React, { Component } from 'react';

export interface MenuItem {
  text: string;
  onClick: () => void;
}

interface MenuPopupProps {
  x: number;
  y: number;
  menuItems: MenuItem[];
  onClose: () => void;
}

class MenuPopup extends Component<MenuPopupProps> {
  menuRef = React.createRef<HTMLDivElement>();
  componentDidMount() {
    document.addEventListener('mousedown', this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside);
  }

  handleClickOutside = (event: MouseEvent) => {
    if (this.menuRef.current && !this.menuRef.current.contains(event.target as Node)) {
      this.props.onClose();
    }
  };

  render() {
    const { x, y, menuItems } = this.props;

    return (
      <div
        ref={this.menuRef}
        className="list-item-menu bg-white text-black border border-neutral-200 rounded-xl shadow-lg transition-all ease-linear"
        style={{ position: 'fixed', left: `${x}px`, top: `${y}px` }}
      >
        <div className="flex flex-col">
          {menuItems.map((item, index) => (
            <button
              key={index}
              className="menu-item-button flex items-center justify-start px-4 py-2 text-sm text-black hover:bg-neutral-100 hover:text-black transition-colors duration-200 ease-in-out my-1 rounded-xl"
              onClick={item.onClick}
            >
              {item.text}
            </button>
          ))}
        </div>
      </div>
    );
  }
}

export default MenuPopup;
