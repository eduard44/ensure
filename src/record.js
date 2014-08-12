(function () {
    "use strict";

    var EnsureRecord,
        EnsureRecordInstance;

    EnsureRecord = function (spec) {
        var record,
            key;

        // Make sure spec is an object
        ensure(spec, Object);

        record = function (values) {
            var recordProperties = {};

            // Make sure values is an object
            ensure(values, Object);

            // First, define properties
            for (key in spec) {
                var keyClone = new String(key);

                if (spec.hasOwnProperty(key)) {
                    Object.defineProperty(
                        this,
                        keyClone,
                        {
                            enumerable: true,
                            get: function () {
                                return recordProperties[keyClone];
                            },
                            set: function (value) {
                                ensure(value, spec[key]);

                                recordProperties[keyClone] = value;
                            }
                        }
                    )
                }
            }

            // Then try to set values
            for (key in values) {
                if (spec.hasOwnProperty(key) && values.hasOwnProperty(key)) {
                    this[key] = values[key];
                }
            }

            // Freeze the instance
            Object.freeze(this);
        };

        record.prototype = new EnsureRecordInstance();

        return Object.freeze(record);
    };

    EnsureRecordInstance = function () {
        //Object.freeze(this);
    };

    ensure.EnsureRecord = EnsureRecord;
    ensure.EnsureRecordInstance = EnsureRecordInstance;
})();