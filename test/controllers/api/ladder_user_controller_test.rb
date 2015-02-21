require 'test_helper'

class Api::LadderUserControllerTest < ActionController::TestCase
  test "should get index" do
    get :index
    assert_response :success
  end

  test "should get update" do
    get :update
    assert_response :success
  end

  test "should get retrieve" do
    get :retrieve
    assert_response :success
  end

end
