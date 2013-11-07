class Api::Admin::DanceRegistrantsController < Api::DanceRegistrantsController

  before_filter :authorize_admin, only: [:index, :check_price]

  def index
    p = ActionController::Parameters.new params
    permitted = p.permit(:email, :ticket_number)

    if permitted[:email] && !permitted[:email].blank? && permitted[:ticket_number] && !permitted[:ticket_number].blank?
      if !permitted[:email].blank? && !permitted[:ticket_number].blank?
        render json: {
            dance_registrants: DanceRegistrant.where("lower(email) = ? AND ticket_number = ?",
                                                     permitted[:email].downcase, permitted[:ticket_number])
        }
      else
        render json: {
            dance_registrants: []
        }
      end
      return
    end

    render json: {
      dance_registrants: DanceRegistrant.all
    }
  end

  def create
    p = ActionController::Parameters.new params[:dance_registrant]
    permitted = p.permit(:name, :email, :phone, :ticket_number, :year)
    registrant = DanceRegistrant.new permitted

    unless registrant.valid?
      render json: { errors: registrant.errors }, status: 400 and return
    end

    # Add a bunch of server generated properties
    registrant.registered_by_id = get_admin.id
    registrant.save!

    render json: { dance_registrant: registrant }
  end

  def check_price
    p = ActionController::Parameters.new params[:dance_registrant]
    permitted = p.permit(:name, :email, :year, :ticket_number)
    registrant = DanceRegistrant.new permitted

    unless registrant.valid?
      render json: { errors: registrant.errors }, status: 400 and return
    end

    # Return the price if the registrant is valid.
    render json: { price: registrant.check_price }
  end

end
