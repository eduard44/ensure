"use strict";

var ensure = require('../ensure'),

    Nothing = ensure.Nothing,
    Nullable = ensure.Nullable,

    CustomType = function () {},
    CustomTypeInstance = new CustomType();

describe('ensure', function () {
    it('should not throw errors if the type matches', function () {
        // String
        (function () {
            ensure('hi', String);
        }).should.not.throw();

        (function () {
            ensure(new String('hi'), String);
        }).should.not.throw();

        (function () {
            ensure('9098' + 56846, String);
        }).should.not.throw();

        // Boolean
        (function () {
            ensure(true, Boolean);
        }).should.not.throw();

        (function () {
            ensure(false, Boolean);
        }).should.not.throw();

        (function () {
            ensure(45 > 0, Boolean);
        }).should.not.throw();

        // Array
        (function () {
            ensure([], Array);
        }).should.not.throw();

        (function () {
            ensure([1, 2, 4], Array);
        }).should.not.throw();

        // Number
        (function () {
            ensure(45, Number);
        }).should.not.throw();

        (function () {
            ensure(45.45, Number);
        }).should.not.throw();

        (function () {
            ensure(-45, Number);
        }).should.not.throw();

        (function () {
            ensure(-45.45, Number);
        }).should.not.throw();

        (function () {
            ensure(new Number(45), Number);
        }).should.not.throw();

        // Object
        (function () {
            ensure({}, Object);
        }).should.not.throw();

        (function () {
            ensure(new Object(), Object);
        }).should.not.throw();

        // Function
        (function () {
            ensure(Array, Function);
        }).should.not.throw();

        (function () {
            ensure(Array, Function);
        }).should.not.throw();

        // Nothing
        (function () {
            ensure(undefined, Nothing);
        }).should.not.throw();

        // Nullable
        (function () {
            ensure(null, Nullable(Array));

            ensure([], Nullable(Array));

            ensure(Nullable(Array), Nullable(Array));
        }).should.not.throw();

        // Custom
        (function () {
            ensure(CustomTypeInstance, CustomType);
        }).should.not.throw();
    });

    it('should throw errors if the type does not match', function () {
        // String
        (function () {
            ensure(45, String);
        }).should.throw();

        (function () {
            ensure(new Object(), String);
        }).should.throw();

        (function () {
            ensure(['hi', 90], String);
        }).should.throw();

        (function () {
            ensure([], String);
        }).should.throw();

        // Boolean
        (function () {
            ensure(1, Boolean);
        }).should.throw();

        (function () {
            ensure(0, Boolean);
        }).should.throw();

        (function () {
            ensure('true', Boolean);
        }).should.throw();

        (function () {
            ensure('false', Boolean);
        }).should.throw();

        // Array
        (function () {
            ensure({}, Array);
        }).should.throw();

        // Number
        (function () {
            ensure('true', Number);
        }).should.throw();

        (function () {
            ensure(true, Number);
        }).should.throw();

        (function () {
            ensure(new Object(), Number);
        }).should.throw();

        // Object
        (function () {
            ensure(null, Object);
        }).should.throw();

        (function () {
            ensure(undefined, Object);
        }).should.throw();

        // Nothing
        (function () {
            ensure('hello', Nothing);
        }).should.throw();

        // Nullable
        (function () {
            ensure(string, Nullable(Array));
        }).should.throw();

        (function () {
            ensure(undefined, Nullable(Array));
        }).should.throw();

        // Custom
        (function () {
            ensure(0, CustomType);
        }).should.throw();
    });

    it('should return false on soft mode', function () {
        (function () {
            ensure(9999, String, true).should.be.false;
        }).should.not.throw();

        (function () {
            ensure(9999, Boolean, true).should.be.false;
        }).should.not.throw();

        (function () {
            ensure(9999, Array, true).should.be.false;
        }).should.not.throw();

        (function () {
            ensure("hi", Number, true).should.be.false;
        }).should.not.throw();

        (function () {
            ensure(null, Object, true).should.be.false;
        }).should.not.throw();

        (function () {
            ensure(9999, CustomType, true).should.be.false;
        }).should.not.throw();
    });
});