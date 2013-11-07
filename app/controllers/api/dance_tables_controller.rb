class Api::DanceTablesController < ApplicationController
  def index
    tables = DanceTable.where(reserved: false).includes(:registrants)
    render json: {
      dance_tables: JSON.parse(tables.to_json(include: { registrants: { only: [:id, :name] } }))
    }
  end
end