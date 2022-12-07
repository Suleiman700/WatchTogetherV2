
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
        return $('#rooms_table').find('tbody tr').length
    }

    /**
     * Show no results row
     * @param _option {boolean}
     * @param _text {string}
     */
    show_info_row(_option, _text) {
        // Delete previous row if found
        $('table tbody tr#table_info_row').remove()

        $("#rooms_table").find('tbody')
            .append($('<tr>')
                .attr({'id': 'table_info_row'})
                .css({'display': _option? 'contents' : 'none'})
                .append($('<th>')
                    .attr({'colspan': '20', 'class': 'text-muted'})
                    .text(_text)
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

        $("#rooms_table").find('tbody')
            .append($('<tr>')
                .append($('<th>')
                    .attr('scope', 'row')
                    .text(count)
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
