class Api::DanceRegistrantsController < ApplicationController
  def index
    p = ActionController::Parameters.new params
    permitted = p.permit(:email, :ticket_number)

    if permitted[:email] && !permitted[:email].blank? && permitted[:ticket_number] && !permitted[:ticket_number].blank?
      render json: {
        dance_registrants: DanceRegistrant.where("lower(email) = ? AND ticket_number = ?",
                                                 permitted[:email].downcase, permitted[:ticket_number])
      }
      return
    end

    render json: {
      dance_registrants: []
    }
  end

  def update
    #render json: {
    #    error: { email: ["No more changes are allowed for this email."] }
    #}, status: 401
    #return

    p = ActionController::Parameters.new params[:dance_registrant]
    permitted = p.permit(:email, :ticket_number)

    if permitted[:email] && permitted[:ticket_number]
      registrant = DanceRegistrant.where("lower(email) = ? AND ticket_number = ?",
                                         permitted[:email].downcase, permitted[:ticket_number]).first
      # Now that we've found the registrant, update their properties.
      permitted = p.permit(:table_number, :is_over19, :dietary_restrictions, :entree_choice, :transport_to, :transport_from)
      permitted[:is_over19] ||= false

      if registrant
        if registrant.update_attributes(permitted)
          render json: { dance_registrant: registrant } and return
        else
          render json: { errors: registrant.errors }, status: 400 and return
        end
      end
    end

    render json: {
      errors: { email: ["Invalid email and ticket number combination."] }
    }, status: 401
  end

  def early_bird_remaining
    render json: {
      remaining: DanceRegistrant.early_bird_remaining?
    }
  end
  
  def frosh_discounts_remaining
    render json: {
      remaining: DanceRegistrant.frosh_discounts_remaining?
    }
  end
end
