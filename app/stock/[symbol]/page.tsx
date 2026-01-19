import TradingViewWidget from "@/components/TradingViewWidget"

const StockPage = ({ params }: { params: { symbol: string } }) => {
  const { symbol } = params

  const chartConfig = {
    symbol,
    width: "100%",
    height: 600,
    colorTheme: "dark",
    locale: "en",
    autosize: true,
    interval: "D",
  }

  const newsConfig = {
    symbols: [symbol],
    width: "100%",
    height: 400,
    colorTheme: "dark",
    locale: "en",
  }

  console.log(`NASDAQ:${symbol}`)

  return (
    <div className="flex flex-col gap-8 p-6">
      <TradingViewWidget
        title={`${symbol} Chart`}
        scriptUrl="https://s3.tradingview.com/external-embedding/embed-widget-symbol-overview.js"
        config={{
          symbol: `NASDAQ:${symbol}`, // exchange + symbol
          width: "100%",
          height: 600,
          colorTheme: "dark",
          locale: "en",
          autosize: true,
          interval: "D",
        }}
        className="custom-chart rounded-lg shadow-lg"
      />

      <TradingViewWidget
        title={`${symbol} News`}
        scriptUrl="https://s3.tradingview.com/external-embedding/embed-widget-timeline.js"
        config={newsConfig}
        className="custom-chart rounded-lg shadow-lg"
        height={400}
      />
    </div>
  )
}

export default StockPage
