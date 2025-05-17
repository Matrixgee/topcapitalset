import React, { useEffect } from 'react';

const TradingWidgetThree: React.FC = () => {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-mini-symbol-overview.js';
    script.async = true;
    script.innerHTML = JSON.stringify({
      symbol: 'BITSTAMP:BTCUSD',
      width: 'auto',
      height: 145,
      locale: 'en',
      dateRange: '12M',
      colorTheme: 'dark',
      isTransparent: false,
      autosize: false,
      largeChartUrl: ''
    });

    const widgetContainer = document.querySelector('.tradingview-widget-container__widget');
    if (widgetContainer) {
      widgetContainer.appendChild(script);
    }

    return () => {
      if (widgetContainer) {
        widgetContainer.innerHTML = '';
      }
    };
  }, []);

  return (
    <div className="tradingview-widget-container">
      <div className="tradingview-widget-container__widget"></div>
      <div className="tradingview-widget-copyright">
        <a href="https://www.tradingview.com/" rel="noopener nofollow" target="_blank">
          {/* <span className="blue-text">Track all markets on TradingView</span> */}
        </a>
      </div>
    </div>
  );
};

export default TradingWidgetThree;
