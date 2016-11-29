require 'forecast_io'

ForecastIO.configure do |config|
  config.api_key = Figaro.env.forecast_io_key
  config.default_params = {lang: 'fr', units: 'si'}
end
