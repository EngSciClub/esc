class Api::DanceRegistrantsController < ApplicationController

  def index
    render json: {
      dance_registrants: []
    }
  end

end
