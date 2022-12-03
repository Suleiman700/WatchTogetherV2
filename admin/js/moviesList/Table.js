
class Table {
    constructor() {}

    // Clear table
    clear() {

    }

    /**
     * Count table rows
     * @returns {number}
     */
    count_rows() {
        return $('#movies_table').find('tbody tr').length
    }

    /**
     * Show no results row
     */
    show_no_results() {
        $("#movies_table").find('tbody')
            .append($('<tr>')
                .append($('<th>')
                    .attr({'colspan': '20', 'class': 'text-warning'})
                    .text('No movies have been found')
                )
            );
    }

    /**
     * Generate edit icon
     * @param _movie_id
     */
    gen_edit_icon(_movie_id) {

    }

    /**
     * Add movie row
     * @param _movie_data {object}
     */
    add_row(_movie_data) {
        const count = this.count_rows()

        $("#movies_table").find('tbody')
            .append($('<tr>')
                .append($('<th>')
                    .attr('scope', 'row')
                    .text(count+1)
                )
                .append($('<td>')
                    .text(_movie_data['movie_name'])
                )
                .append($('<td>')
                    .text(_movie_data['movie_year'])
                )
                .append($('<td>')
                    .text(_movie_data['movie_genre'])
                )
                .append($('<td>')
                    .text(_movie_data['movie_rating'])
                )
                .append($('<td>')
                    .append($('<i>')
                        .attr('class', 'fa fa-edit')
                        .css('cursor', 'pointer')
                        .click(() => {
                            window.location.href = `./edit-movie.html?id=${_movie_data['_id']}`;
                        })
                    )
                )
            );

    }
}

export default new Table()
