require 'test_helper'

class ForecastsControllerTest < ActionController::TestCase
  setup do
    @forecast = forecasts(:one)
  end

  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:forecasts)
  end

  test "should get new" do
    get :new
    assert_response :success
  end

  test "should create forecast" do
    assert_difference('Forecast.count') do
      post :create, forecast: { lat: @forecast.lat, lng: @forecast.lng }
    end

    assert_redirected_to forecast_path(assigns(:forecast))
  end

  test "should show forecast" do
    get :show, id: @forecast
    assert_response :success
  end

  test "should get edit" do
    get :edit, id: @forecast
    assert_response :success
  end

  test "should update forecast" do
    patch :update, id: @forecast, forecast: { lat: @forecast.lat, lng: @forecast.lng }
    assert_redirected_to forecast_path(assigns(:forecast))
  end

  test "should destroy forecast" do
    assert_difference('Forecast.count', -1) do
      delete :destroy, id: @forecast
    end

    assert_redirected_to forecasts_path
  end
end
