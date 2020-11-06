import React from 'react';
import './Logo.css';

type Props = { 
  title?: string
  subtitle?: string
}
export class Logo extends React.Component<Props> {

  render() {
    return (
      <>
        <div className="logo">
          <p className="logo-title">{this.fallbackIfNull(this.props.title, "Dordrecht")}</p>
          <p className="logo-subtitle">{this.fallbackIfNull(this.props.subtitle, "door de jaren heen")}</p>
        </div>
      </>
    );
  }

  fallbackIfNull(value?: string, fallback?: string) {
      if (!!value) { return value; }
      return fallback;
  }
}

export default Logo;
