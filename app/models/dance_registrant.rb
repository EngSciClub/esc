class DanceRegistrant < ActiveRecord::Base

  FROSH_YEAR = "1T9"
  FROSH_DISCOUNT = 5
  FROSH_TOTAL = 25
  EARLY_BIRD_TOTAL = 50
  EARLY_BIRD_DISCOUNT = 5
  DEFAULT_PRICE = 70

  VALID_EMAIL_REGEX = /\A[\w+\-.]+@[a-z\d\-.]+\.[a-z]+\z/i
  VALID_EMAIL_UTORONTO_REGEX = /\A[\w+\-.]+@mail.utoronto.ca\z/i

  TOTAL_TICKETS = 280

  belongs_to :dance_table

  validates :name,
            length: {
                minimum: 1,
                too_short: "Name must be present.",
                maximum: 100,
                too_long: "Name is too long."
            }
  validates :email,
            length: {
                minimum: 1,
                too_short: "Email must be present.",
                maximum: 100,
                too_long: "Email is too long."
            },
            format: { with: VALID_EMAIL_REGEX, message: "Invalid email address format." }
  validates :year,
            inclusion: { in: %w(1T9 1T8 1T7 1T6 PEY 1T5+PEY Guest), message: "Not a valid year." }
  validates :ticket_number,
            numericality: {
                only_integer: true,
                greater_than_or_equal_to: 1,
                less_than_or_equal_to: TOTAL_TICKETS,
                message: "Not a valid ticket number."
            }
  validates :is_over19,
            inclusion: { in: [ true, false ], message: "Not a valid option." },
            on: :update
  validates :table_number,
            numericality: {
                only_integer: true,
                greater_than_or_equal_to: 1,
                less_than_or_equal_to: DanceTable.num_tables,
                message: "Not a valid table number."
            },
            on: :update
  validates :dietary_restrictions,
            length: {
                maximum: 8000,
                too_long: "Your dietary restrictions are too long."
            },
            allow_nil: true,
            on: :update
  validates :entree_choice,
            inclusion: {
                in: ["MAIN - Grilled Rib Eye Steak", "VEGETARIAN - Portabello Mushroom and Goat Cheese Strudel"],
                message: "Not a valid entree choice."
            },
            on: :update
  validate :ticket_number_unique, on: :create  # Use our own method so we can test before on save.
  validate :table_not_full, on: :update

  before_create do
    self.email.downcase!
    self.amount_paid = check_price
    self.is_early_bird = eligible_for_early_bird?
    true
  end

  def check_price
    price = DEFAULT_PRICE

    # F!rosh are entitled to a discount, but only for one ticket. 
    if eligible_for_frosh_dicount?
      price -= FROSH_DISCOUNT
    else
    # Check if they're eligible for early bird discount. F!rosh are not eligible for both discounts.
    if eligible_for_early_bird?
      price -= EARLY_BIRD_DISCOUNT
    end
  end

    price
  end

  def self.early_bird_remaining?
    remaining = EARLY_BIRD_TOTAL - DanceRegistrant.where(is_early_bird: true).count
    remaining >= 0 ? remaining : 0
  end
  
  def self.frosh_discounts_remaining?
	remaining = FROSH_TOTAL - DanceRegistrant.where(year: FROSH_YEAR).count
	remaining >= 0? remaining : 0
  end

  def eligible_for_early_bird?
    (DanceRegistrant.where(is_early_bird: true).count < EARLY_BIRD_TOTAL) &&  (self.year != FROSH_YEAR) #barryklfung - earlybird and F!rosh discounts are exclusive of each other.
  end
  
  def eligible_for_frosh_dicount?
    existing_registrant = DanceRegistrant.find_by email: email
	(DanceRegistrant.where(year: FROSH_YEAR).count < FROSH_TOTAL) && (self.year == FROSH_YEAR) && existing_registrant.nil? && VALID_EMAIL_UTORONTO_REGEX =~ email #barryklfung - moved F!rosh eligibility to function
  end
  
  def ticket_number_unique
    if DanceRegistrant.find_by ticket_number: ticket_number
      errors.add(:ticket_number, "Ticket number already registered.")
    end
  end

  def table_not_full
    old_table = DanceRegistrant.find(id).table_number
    if DanceTable.find(table_number).reserved ||
        DanceRegistrant.where(table_number: table_number).count + (old_table == table_number ? 0 : 1) > DanceTable::TABLE_SIZE
      errors.add(:table_number, "Table number is invalid.")
    end
  end
end
