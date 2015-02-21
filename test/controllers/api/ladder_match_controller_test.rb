require 'test_helper'

class Api::LadderMatchControllerTest < ActionController::TestCase
  test "should get index" do
    get :index
    assert_response :success
  end

  test "should get update_player" do
    get :update_player
    assert_response :success
  end

  test "should get point_calculate" do
    get :point_calculate
    assert_response :success
  end

end
