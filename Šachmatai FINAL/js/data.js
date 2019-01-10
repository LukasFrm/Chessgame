"use strict";

var GAME = {
    white_timer: 1,
    black_timer: 1,
    whose_turn: 'w',
    allowed_moves: [],
    move_history: [], 
    chessPieces: {
        w_king: {
            position: 'e1',
            img: '&#9812;',
            type: 'w_king',
            moved: 'false',
        },
        w_queen: {
            position: 'd1',
            img: '&#9813;',
            type: 'w_queen',
            moved: 'false',
        },
        w_bishop1: {
            position: 'c1',
            img: '&#9815;',
            type: 'w_bishop',
            moved: 'false',
        },
        w_bishop2: {
            position: 'f1',
            img: '&#9815;',
            type: 'w_bishop',
            moved: 'false',
        },
        w_knight1: {
            position: 'b1',
            img: '&#9816;',
            type: 'w_knight',
            moved: 'false',
        },
        w_knight2: {
            position: 'g1',
            img: '&#9816;',
            type: 'w_knight',
            moved: 'false',
        },
        w_rook1: {
            position: 'a1',
            img: '&#9814;',
            type: 'w_rook',
            moved: 'false',
        },
        w_rook2: {
            position: 'h1',
            img: '&#9814;',
            type: 'w_rook',
            moved: 'false',
        },
        w_pawn1: {
            position: 'a2',
            img: '&#9817;',
            type: 'w_pawn',
            moved: 'false',
        },
        w_pawn2: {
            position: 'b2',
            img: '&#9817;',
            type: 'w_pawn',
            moved: 'false',
        },
        w_pawn3: {
            position: 'c2',
            img: '&#9817;',
            type: 'w_pawn',
            moved: 'false',
        },
        w_pawn4: {
            position: 'd2',
            img: '&#9817;',
            type: 'w_pawn',
            moved: 'false',
        },
        w_pawn5: {
            position: 'e2',
            img: '&#9817;',
            type: 'w_pawn',
            moved: 'false',
        },
        w_pawn6: {
            position: 'f2',
            img: '&#9817;',
            type: 'w_pawn',
            moved: 'false',
        },
        w_pawn7: {
            position: 'g2',
            img: '&#9817;',
            type: 'w_pawn',
            moved: 'false',
        },
        w_pawn8: {
            position: 'h2',
            img: '&#9817;',
            type: 'w_pawn',
            moved: 'false',
        },
        b_king: {
            position: 'e8',
            img: '&#9818;',
            type: 'b_king',
            moved: 'false',
        },
        b_queen: {
            position: 'd8',
            img: '&#9819;',
            type: 'b_queen',
            moved: 'false',
        },
        b_bishop1: {
            position: 'c8',
            img: '&#9821;',
            type: 'b_bishop',
            moved: 'false',
        },
        b_bishop2: {
            position: 'f8',
            img: '&#9821;',
            type: 'b_bishop',
            moved: 'false',
        },
        b_knight1: {
            position: 'b8',
            img: '&#9822;',
            type: 'b_knight',
            moved: 'false',
        },
        b_knight2: {
            position: 'g8',
            img: '&#9822;',
            type: 'b_knight',
            moved: 'false',
        },
        b_rook1: {
            position: 'a8',
            img: '&#9820;',
            type: 'b_rook',
            moved: 'false',
        },
        b_rook2: {
            position: 'h8',
            img: '&#9820;',
            type: 'b_rook',
            moved: 'false',
        },
        b_pawn1: {
            position: 'a7',
            img: '&#9823;',
            type: 'b_pawn',
            moved: 'false',
        },
        b_pawn2: {
            position: 'b7',
            img: '&#9823;',
            type: 'b_pawn',
            moved: 'false',
        },
        b_pawn3: {
            position: 'c7',
            img: '&#9823;',
            type: 'b_pawn',
            moved: 'false',
        },
        b_pawn4: {
            position: 'd7',
            img: '&#9823;',
            type: 'b_pawn',
            moved: 'false',
        },
        b_pawn5: {
            position: 'e7',
            img: '&#9823;',
            type: 'b_pawn',
            moved: 'false',
        },
        b_pawn6: {
            position: 'f7',
            img: '&#9823;',
            type: 'b_pawn',
            moved: 'false',
        },
        b_pawn7: {
            position: 'g7',
            img: '&#9823;',
            type: 'b_pawn',
            moved: 'false',
        },
        b_pawn8: {
            position: 'h7',
            img: '&#9823;',
            type: 'b_pawn',
            moved: 'false',
        }
    }   
};
var selectedPieceType = '';
var selectedPieceFig = '';
var selectedIndex = 0;
var count = 0;
var wTimer;
