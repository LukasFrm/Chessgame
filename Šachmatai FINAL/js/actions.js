"use strict";

$('div').on('click', '.start', function() {
    count++;
    renderBoard();
    renderPieces(GAME);
    $('.start').css('display','none');
    $('.pause').css('display','inline-block');
    $('.reset').css('display','inline-block');
    
    if(count === 3) {
        startClockW(); 
    }
console.log(count)
});

$('div').on('click', '.pause', function() {
        var x = '';
    if( $('.pause').text() === 'Pause') {
        $('.board').css('filter','blur(30px)');
        $('.move-history').css('filter','blur(30px)');
        $('.pause').html('Resume');
        GAME.whose_turn = 'p';
    } else {
        $('.board').css('filter','');
        $('.move-history').css('filter','')
        $('.pause').html('Pause');
    };
console.log(x)
});

$('div').on('click', '.reset', function() {
    resetGame();
});

$('.board').on('click', '.cell', function(){
    var w=8,
        figura_in_cell = $(this).text(),
        current_cell = $(this).attr('data-figure'),
        moved = $(this).attr('data-moved'),
        figuros_tipas = current_cell.slice(2),
        figuros_komanda = current_cell[0],
        index = $( this ).index(),
        x = index%w,
        y = (index-x)/w;


    if(current_cell === '' && $(this).hasClass('allowed') ) {

        GAME.move_history.push(index);
        $(this).html(selectedPieceFig);
        $(this).attr('data-figure', selectedPieceType);
        $(this).attr('data-moved', true);
        $('.cell').eq(selectedIndex).html('');
        $('.cell').eq(selectedIndex).attr('data-figure','');
        selectedPieceType = '';
        selectedPieceFig = '';
        selectedIndex = 0;
        $('.cell').removeClass('allowed');
        $('.cell').removeClass('enemy');
        $('.cell').removeClass('active');

            if( GAME.whose_turn === 'w') {
                GAME.whose_turn = 'b';
            } else {
                GAME.whose_turn = 'w';
            }
        
    } else if( current_cell !== '' && $(this).hasClass('enemy') ) {

        if($(this).attr('data-figure') === 'w_king' || $(this).attr('data-figure') === 'b_king') {
            alert('GAME OVER... pralaimejo');
            location.reload();
        }

        GAME.move_history.push(index);
        $(this).html(selectedPieceFig);
        $(this).attr('data-figure', selectedPieceType);
        $(this).attr('data-moved', true);
        $('.cell').eq(selectedIndex).html('');
        $('.cell').eq(selectedIndex).attr('data-figure','');
        selectedPieceType = '';
        selectedPieceFig = '';
        selectedIndex = 0;
        $('.cell').removeClass('allowed');
        $('.cell').removeClass('enemy');
        $('.cell').removeClass('active');

        if( GAME.whose_turn === 'w') {
            GAME.whose_turn = 'b';
        } else {
            GAME.whose_turn = 'w';
        }

    } else if (figuros_komanda === GAME.whose_turn) {

        GAME.move_history = [];

        $('.cell').removeClass('active');
        $(this).addClass('active');
        $('.cell').removeClass('allowed');
        $('.cell').removeClass('enemy');
        selectedIndex = index;
        selectedPieceType = current_cell;
        selectedPieceFig = figura_in_cell;

        GAME.move_history.push(index, selectedPieceFig);

        findAvailableMoves( moved, figuros_tipas, figuros_komanda, [x,y]);

    }

    if ( GAME.move_history.length === 3) {
        var from = $('.cell').eq(GAME.move_history[0]).attr('id'),
            who = GAME.move_history[1],
            to = $('.cell').eq(GAME.move_history[2]).attr('id'),
            move = '<div class="move"> '+(count++ - 2)+'. from '+from+' '+who+' to '+to+' </div>';

        if( GAME.whose_turn === 'b') {
            $('#white').append(move);
            GAME.move_history = [];
        }
        if( GAME.whose_turn === 'w' )
            $('#black').append(move);
            GAME.move_history = [];
    }

});
