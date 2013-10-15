class DanceRegistrant < ActiveRecord::Base

  FROSH_YEAR = "1T7"
  FROSH_DISCOUNT = 5
  EARLY_BIRD_TOTAL = 200
  EARLY_BIRD_DISCOUNT = 5
  DEFAULT_PRICE = 70

  VALID_EMAIL_REGEX = /\A[\w+\-.]+@[a-z\d\-.]+\.[a-z]+\z/i
  VALID_EMAIL_UTORONTO_REGEX = /\A[\w+\-.]+@mail.utoronto.ca\z/i

  validates :name,
            length: { minimum: 1, too_short: "Name must be present." }
  validates :email,
            length: { minimum: 1, too_short: "Email must be present." },
            format: { with: VALID_EMAIL_REGEX, message: "Invalid email address format." }
  validates :year,
            inclusion: { in: %w(1T7 1T6 1T5 1T4 PEY 1T3+PEY Guest), message: "Not a valid year." }
  validates :ticket_number,
            numericality: {
                only_integer: true,
                greater_than_or_equal_to: 1,
                less_than_or_equal_to: 350,
                message: "Not a valid ticket number."
            }
  validate :ticket_number_unique # Use our own method so we can test before on save.

  before_create do
    self.amount_paid = check_price
    self.is_early_bird = eligible_for_early_bird?
    true
  end

  def check_price
    price = DEFAULT_PRICE

    # F!rosh are entitled to a discount, but only for one ticket.
    existing_registrant = DanceRegistrant.find_by email: email
    if year == FROSH_YEAR && existing_registrant.nil? && VALID_EMAIL_UTORONTO_REGEX =~ email
      price -= FROSH_DISCOUNT
    end

    # Check if they're eligible for early bird discount.
    if eligible_for_early_bird?
      price -= EARLY_BIRD_DISCOUNT
    end

    price
  end

  def self.early_bird_remaining?
    remaining = EARLY_BIRD_TOTAL - DanceRegistrant.count
    remaining >= 0 ? remaining : 0
  end

  def eligible_for_early_bird?
    DanceRegistrant.count < EARLY_BIRD_DISCOUNT
  end

  def ticket_number_unique
    if DanceRegistrant.find_by ticket_number: ticket_number
      errors.add(:ticket_number, "Ticket number already registered.")
    end
  end

end
