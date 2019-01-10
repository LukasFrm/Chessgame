"use strict";

function renderBoard () {
    var langeliai = 64,
        w = Math.sqrt(langeliai),
        id_value = '',
        piece_type = '',
        piece_moved = false,
        HTML = '';

    for( var i=0; i<langeliai; i++) {
        id_value = String.fromCharCode(97 + (i%w))+''+(-(((i-(i%w))/w)-w));
        piece_type = '';
        piece_moved = false;

        for(var p in GAME.chessPieces) {
            if(GAME.chessPieces[p].position === id_value ) {
                piece_type = GAME.chessPieces[p].type;
                piece_moved = GAME.chessPieces[p].moved;
                break;
            }
        }
        if( ((i-(i%w))/w + (i%w))%2 === 0   ) {
            HTML += '<div class="cell" id="'+id_value+'" data-figure="'+piece_type+'" data-moved="'+piece_moved+'"></div>';
        } else {
            HTML += '<div class="cell black" id="'+id_value+'" data-figure="'+piece_type+'" data-moved="'+piece_moved+'"></div>';
        }
    } 
$('.board').html(HTML);
return;
};

function renderPieces() {
    for(var p in GAME.chessPieces) {
        $('.board').find('#'+GAME.chessPieces[p].position).html( GAME.chessPieces[p].img);
    };
return;
};

function findAvailableMoves(ar_judejo, tipas, komanda, koordinates) {

    switch(tipas) {
        case 'pawn':
            if( komanda === 'w' ) {
                white_pawn_moves(komanda, ar_judejo, koordinates);
            }
            if( komanda === 'b' ) {
                black_pawn_moves(komanda, ar_judejo, koordinates);
            }
            break;

        case 'rook': 
            rook_moves(komanda, koordinates);
            break;

        case 'knight': 
            knight_moves(komanda, koordinates);
            break;

        case 'bishop': 
            bishop_moves(komanda, koordinates);
            break;

        case 'king': 
            king_moves(komanda, koordinates);
            break;

        case 'queen': 
            queen_moves(komanda, koordinates);
            break;

        default: break;
    }

    return;
}

function white_pawn_moves(komanda, ar_judejo, koordinates) {
    var index = 0,
        cell = '';

    GAME.allowed_moves = [];
    // tikrinam du i virsu
    if(ar_judejo === 'false') {

        // tikrinam viska kas i virsu vienas i kaire vienas
        index = (koordinates[1]-1)*8+koordinates[0]-1;
            if(koordinates[1]-1 >= 0 && koordinates[0]-1 >= 0) {
                cell = $('.cell').eq(index).attr('data-figure');
                if( cell !== '' && cell[0] !==komanda) {
                    $('.cell').eq(index).addClass('enemy');
                }  
            }

        // tikrinam viska kas i virsu du i desine vienas
        index = (koordinates[1]-1)*8+koordinates[0]+1;

        if(koordinates[1]-1 >= 0 && koordinates[0]+1 < 8) {
            cell = $('.cell').eq(index).attr('data-figure');
            cell = $('.cell').eq(index).attr('data-figure');
            if( cell !== '' && cell[0] !==komanda) {
            }  
        }
        
        for(var i=1; i<3; i++) {
            index = (koordinates[1]-i)*8+koordinates[0];

            if(koordinates[1]-i >= 0) {
                cell = $('.cell').eq(index).attr('data-figure');
                if( cell === '') {
                    $('.cell').eq(index).addClass('allowed');
                } else if( cell !== '' && cell[0] !== komanda) {
                    break;
                } else {
                    break;
                }
            }
        }

    } else if( ar_judejo === 'true') {
        index = (koordinates[1]-1)*8+koordinates[0];

        if(koordinates[1]-1 >= 0) {
            cell = $('.cell').eq(index).attr('data-figure');
            if( cell === '') {
                $('.cell').eq(index).addClass('allowed');
            } else if( cell !== '' && cell[0] !== komanda) {
            } 
        }
        if(koordinates[1]-1 >= 0) {
            cell = $('.cell').eq(index).attr('data-figure');
            if( cell === '') {
                $('.cell').eq(index).addClass('allowed');
            } else if( cell !== '' && cell[0] !== komanda) {
            } 
        }
        // tikrinam viska kas i virsu vienas i kaire vienas
        index = (koordinates[1]-1)*8+koordinates[0]-1;
        if(koordinates[1]-1 >= 0 && koordinates[0]-1 >= 0) {
            cell = $('.cell').eq(index).attr('data-figure');
            if( cell !== '' && cell[0] !==komanda) {
                $('.cell').eq(index).addClass('enemy');
            }  
        }

        // tikrinam viska kas i virsu du i desine vienas
        index = (koordinates[1]-1)*8+koordinates[0]+1;
        if(koordinates[1]-1 >= 0 && koordinates[0]+1 < 8) {
            cell = $('.cell').eq(index).attr('data-figure');
            cell = $('.cell').eq(index).attr('data-figure');
            if( cell !== '' && cell[0] !==komanda) {
                $('.cell').eq(index).addClass('enemy');
            }  
        }

    }
return;
};

function black_pawn_moves(komanda, ar_judejo, koordinates) {
    var index = 0,
        cell = '';

    GAME.allowed_moves = [];

    // tikrinam viska kas i virsu vienas i kaire vienas
    index = (koordinates[1]+1)*8+koordinates[0]-1;
    if(koordinates[1]+1 < 8 && koordinates[0]-1 >= 0) {
        cell = $('.cell').eq(index).attr('data-figure');
        if( cell !== '' && cell[0] !==komanda) {
            $('.cell').eq(index).addClass('enemy');
        }  
    }

    // tikrinam viska kas i virsu du i desine vienas
    index = (koordinates[1]+1)*8+koordinates[0]+1;
    if(koordinates[1]+1 < 8 && koordinates[0]+1 < 8) {
        cell = $('.cell').eq(index).attr('data-figure');
        cell = $('.cell').eq(index).attr('data-figure');
        if( cell !== '' && cell[0] !==komanda) {
            $('.cell').eq(index).addClass('enemy');
        }  
    }
     
    if(ar_judejo === 'false') {
       
        for(var i=1; i<3; i++) {
            index = (koordinates[1]+i)*8+koordinates[0];

            if(koordinates[1]+i < 8) {
                cell = $('.cell').eq(index).attr('data-figure');
                if( cell === '') {
                    $('.cell').eq(index).addClass('allowed');
                } else if( cell !== '' && cell[0] !== komanda) {
                    break;
                } else {
                    break;
                }
            }
        }
    } else if( ar_judejo === 'true') {
        index = (koordinates[1]+1)*8+koordinates[0];

        if(koordinates[1]+1 < 8) {
            cell = $('.cell').eq(index).attr('data-figure');
            if( cell === '') {
                $('.cell').eq(index).addClass('allowed');
            } else if( cell !== '' && cell[0] !== komanda) {
            } 
        }
        if(koordinates[1]+1 < 8) {
            cell = $('.cell').eq(index).attr('data-figure');
            if( cell === '') {
                $('.cell').eq(index).addClass('allowed');
            } else if( cell !== '' && cell[0] !== komanda) {
            } 
        }
    }
return;
};

function rook_moves( komanda, koordinates) {
    var w = 8,
        index = 0,
        cell = '';

        GAME.allowed_moves = [];
    // tikrinam viskas kas i virsu
        for(var i=1; i<w; i++) {
            index = (koordinates[1]-i)*8+koordinates[0];
            if(koordinates[1]-i >= 0) {
                cell = $('.cell').eq(index).attr('data-figure');
                if( cell === '') {
                    $('.cell').eq(index).addClass('allowed');
                } else if( cell !== '' && cell[0] !== komanda) {
                    $('.cell').eq(index).addClass('enemy');
                    break;
                } else {
                    break;
                }
            }
        }

    // tikrinam viska kas i apacia

    for(var i=1; i<w; i++) {
        index = (koordinates[1]+i)*8+koordinates[0];
        if(koordinates[1]+i < 8) {
            cell = $('.cell').eq(index).attr('data-figure');
            if( cell === '') {
                $('.cell').eq(index).addClass('allowed');
            } else if( cell !== '' && cell[0] !== komanda) {
                $('.cell').eq(index).addClass('enemy');
                break;
            } else {
                break;
            }
        }
    }
    // tikrinam viska kas i desine

    for(var i=1; i<w; i++) {
        index = (koordinates[1])*8+koordinates[0]+i;
        if(koordinates[0]+i < 8) {
            cell = $('.cell').eq(index).attr('data-figure');
            if( cell === '') {
                $('.cell').eq(index).addClass('allowed');
            } else if( cell !== '' && cell[0] !== komanda) {
                $('.cell').eq(index).addClass('enemy');
                break;
            } else {
                break;
            }
        }
    }
    // tikrinam viska kas i kaire

    for(var i=1; i<w; i++) {
        index = (koordinates[1])*8+koordinates[0]-i;
        if(koordinates[0]-i >= 0) {
            cell = $('.cell').eq(index).attr('data-figure');
            if( cell === '') {
                $('.cell').eq(index).addClass('allowed');
            } else if( cell !== '' && cell[0] !== komanda) {
                $('.cell').eq(index).addClass('enemy');
                break;
            } else {
                break;
            }
        }
    }
    return;
}

function bishop_moves( komanda, koordinates ) {
    var w = 8,
        index = 0,
        cell = '';

        GAME.allowed_moves = [];

// tikrinam viska kas i virsu i kaire
    for(var i=1; i<w; i++) {
        index = (koordinates[1]-i)*8+koordinates[0]-i;

        if(koordinates[1]-i >= 0 && koordinates[0]-i >= 0) {
            cell = $('.cell').eq(index).attr('data-figure');
            if( cell === '') {
                $('.cell').eq(index).addClass('allowed');
            } else if( cell !== '' && cell[0] !== komanda) {
                $('.cell').eq(index).addClass('enemy');
                break;
            } else {
                break;
            }
        }
    }

    // tikrinam viska kas i virsu i desine
    for(var i=1; i<w; i++) {
        index = (koordinates[1]-i)*8+koordinates[0]+i;

        if(koordinates[1]-i >= 0 && koordinates[0]+i <8) {
            cell = $('.cell').eq(index).attr('data-figure');
            if( cell === '') {
                $('.cell').eq(index).addClass('allowed');
            } else if( cell !== '' && cell[0] !== komanda) {
                $('.cell').eq(index).addClass('enemy');
                break;
            } else {
                break;
            }
        }
    }

    // tikrinam viska kas i apacia i desine
    for(var i=1; i<w; i++) {
        index = (koordinates[1]+i)*8+koordinates[0]+i;

        if(koordinates[1]+i <8 && koordinates[0]+i <8) {
            cell = $('.cell').eq(index).attr('data-figure');
            if( cell === '') {
                $('.cell').eq(index).addClass('allowed');
            } else if( cell !== '' && cell[0] !== komanda) {
                $('.cell').eq(index).addClass('enemy');
                break;
            } else {
                break;
            }
        }
    }
    // tikrinam viska kas i apacia i kaire
    for(var i=1; i<w; i++) {
        index = (koordinates[1]+i)*8+koordinates[0]-i;

        if(koordinates[1]+i <8 && koordinates[0]-i >= 0) {
            cell = $('.cell').eq(index).attr('data-figure');
            if( cell === '') {
                $('.cell').eq(index).addClass('allowed');
            } else if( cell !== '' && cell[0] !== komanda) {
                $('.cell').eq(index).addClass('enemy');
                break;
            } else {
                break;
            }
        }
    }

    return;
}

function queen_moves(komanda, koordinates) {

        GAME.allowed_moves = [];
        GAME.allowed_moves.concat( rook_moves(komanda, koordinates) );
        GAME.allowed_moves.concat( bishop_moves(komanda, koordinates) );

    return;
};

function king_moves(komanda, koordinates){
    var w = 8,
        cell = '',
        index = 0,
        temp_index = [],
        x = koordinates[0],
        y = koordinates[1];

        GAME.allowed_moves = [];

        for ( var xx=-1; xx<2; xx++ ) {
            for ( var yy=-1; yy<2; yy++ ) {
                if ( xx === 0 && yy === 0 ) {
                    // nes ta pati koordinate, todel praleidziam
                } else {
                    if ( x+xx < 8 && x+xx >= 0 && y+yy >= 0  && y+yy < 8 ) {
                        GAME.allowed_moves.push( [x+xx, y+yy] )
                    }
                }
            }
        }

        for( var i=0; i<GAME.allowed_moves.length; i++ ) {
            xx = GAME.allowed_moves[i][0];
            yy = GAME.allowed_moves[i][1];
            index = yy*w + xx;
            GAME.allowed_moves[i] = [];
            GAME.allowed_moves[i].push(index);
        }

        for(var i=0; i<GAME.allowed_moves.length; i++) {
            index = GAME.allowed_moves[i];
            cell = $('.cell').eq(index).attr('data-figure');
                if( cell === '') {
                    $('.cell').eq(index).addClass('allowed');
                } else if( cell !== '' && cell[0] !== komanda) {
                    $('.cell').eq(index).addClass('enemy');
                } 
            }


    return;
}

function knight_moves(komanda, koordinates){
    var w = 8,
        index = 0,
        cell = '';

        GAME.allowed_moves = [];

        // tikrinam viska kas i virsu du i kaire vienas
        index = (koordinates[1]-2)*8+koordinates[0]-1;
        if(koordinates[1]-2 >= 0 && koordinates[0]-1 >= 0) {
            cell = $('.cell').eq(index).attr('data-figure');
            if( cell === '') {
                $('.cell').eq(index).addClass('allowed');
            } else if( cell !== '' && cell[0] !== komanda) {
                $('.cell').eq(index).addClass('enemy');
            } 
        }

        // tikrinam viska kas i virsu du i desine vienas
        index = (koordinates[1]-2)*8+koordinates[0]+1;
        if(koordinates[1]-2 >= 0 && koordinates[0]+1 < 8) {
            cell = $('.cell').eq(index).attr('data-figure');
            if( cell === '') {
                $('.cell').eq(index).addClass('allowed');
            } else if( cell !== '' && cell[0] !== komanda) {
                $('.cell').eq(index).addClass('enemy');
            } 
        }

        // tikrinam viska kas i apacia du i desine vienas
        index = (koordinates[1]+2)*8+koordinates[0]+1;
        if(koordinates[1]+2 < 8 && koordinates[0]+1 < 8) {
            cell = $('.cell').eq(index).attr('data-figure');
            if( cell === '') {
                $('.cell').eq(index).addClass('allowed');
            } else if( cell !== '' && cell[0] !== komanda) {
                $('.cell').eq(index).addClass('enemy');
            } 
        }

        // tikrinam viska kas i apacia du i kaire vienas
        index = (koordinates[1]+2)*8+koordinates[0]-1;
        if(koordinates[1]+2 < 8 && koordinates[0]-1 >= 0) {
            cell = $('.cell').eq(index).attr('data-figure');
            if( cell === '') {
                $('.cell').eq(index).addClass('allowed');
            } else if( cell !== '' && cell[0] !== komanda) {
                $('.cell').eq(index).addClass('enemy');
            } 
        }
        
        // tikrinam viska kas i desine du i zemyn vienas
        index = (koordinates[1]-1)*8+koordinates[0]+2;
        if(koordinates[1]-1 >= 0 && koordinates[0]+2 < 8) {
            cell = $('.cell').eq(index).attr('data-figure');
            if( cell === '') {
                $('.cell').eq(index).addClass('allowed');
            } else if( cell !== '' && cell[0] !== komanda) {
                $('.cell').eq(index).addClass('enemy');
            } 
        }

        // tikrinam viska kas i desine du i virsu vienas
        index = (koordinates[1]+1)*8+koordinates[0]+2;
        if(koordinates[1]+1 < 8 && koordinates[0]+2 < 8) {
            cell = $('.cell').eq(index).attr('data-figure');
            if( cell === '') {
                $('.cell').eq(index).addClass('allowed');
            } else if( cell !== '' && cell[0] !== komanda) {
                $('.cell').eq(index).addClass('enemy');
            } 
        }

        // tikrinam viska kas i kaire du i virsu vienas
        index = (koordinates[1]+1)*8+koordinates[0]-2;
        if(koordinates[1]+1 < 8 && koordinates[0]-2 >= 0) {
            cell = $('.cell').eq(index).attr('data-figure');
            if( cell === '') {
                $('.cell').eq(index).addClass('allowed');
            } else if( cell !== '' && cell[0] !== komanda) {
                $('.cell').eq(index).addClass('enemy');
            } 
        }

        // tikrinam viska kas i kaire du i apacia vienas
        index = (koordinates[1]-1)*8+koordinates[0]-2;
        if(koordinates[1]-1 >= 0 && koordinates[0]-2 >= 0) {
            cell = $('.cell').eq(index).attr('data-figure');
            if( cell === '') {
                $('.cell').eq(index).addClass('allowed');
            } else if( cell !== '' && cell[0] !== komanda) {
                $('.cell').eq(index).addClass('enemy');
            } 
        }
    return;
}

function resetGame() {

    renderBoard();
    renderPieces(GAME);
    $('#white').html('');
    $('#black').html('');
    GAME.black_timer = 0;
    GAME.white_timer = 0;
    GAME.move_history = [];
    selectedPieceType = '';
    selectedPieceFig = '';
    selectedIndex = 0;
    GAME.whose_turn = 'w';
    GAME.allowed_moves = [];
    count = 0;
};

function startClockW() {
    wTimer = setInterval(myClock, 1000);

    function myClock() {
        if(GAME.whose_turn === 'w') {
        var ct = GAME.white_timer++;
        $('#timer-white').text(ct +' sec');
        } else if(GAME.whose_turn === 'b') {
        var ct = GAME.black_timer++;
        $('#timer-black').text(ct+' sec');
        }
    }
    return;
}
