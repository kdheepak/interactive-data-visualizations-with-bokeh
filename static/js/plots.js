(function (exports) {
    function largeDataPlot() {

        var plt = Bokeh.Plotting;

        // set up some data
        var M = 5000;
        var x = [];
        var y = [];
        // create a data source
        for (var i = 0; i <= M; i += 1) {
                x.push(Math.random() * 100 );
                y.push(Math.random() * 100 );
            }
        var source = new Bokeh.ColumnDataSource({
            data: {x: x, y: y}
        });

        // make a figure
        var p = plt.figure({title: "Interactive " + M + " points visualization", width: 400, height: 400, tools: "pan,box_zoom,wheel_zoom,lasso_select,reset,save",
            x_range: new Bokeh.DataRange1d({start: -5.0, end: 105.0}),
            y_range: new Bokeh.DataRange1d({start: -5.0, end: 105.0})
        });

        // call the line glyph method to add a line
        var line = p.circle({ field: "x" }, { field: "y" }, {
            source: source,
        });

        // add the plot to a document and display it
        var doc = new Bokeh.Document();
        doc.add_root(p);
        var div = document.getElementById("plotLargeData");
        Bokeh.embed.add_document_standalone(doc, div);

    }



    function titlePlot() {

        var plt = Bokeh.Plotting;

        // set up some data
        var M = 100;
        var x = [];
        var y = [];
        // create a data source
        var source = new Bokeh.ColumnDataSource({
            data: {x: x, y: y}
        });

        // make a figure
        var p = plt.figure({width: 400, height: 400, tools: false,
            x_range: new Bokeh.DataRange1d({start: -5.0, end: 105.0}),
            y_range: new Bokeh.DataRange1d({start: -5.0, end: 105.0})
        });

        p._xaxis.visible = false;
        p._yaxis.visible = false;
        p.xgrid.grid_line_color = 'white';
        p.ygrid.grid_line_color = 'white';

        // call the line glyph method to add a line
        var line = p.line({ field: "x" }, { field: "y" }, {
            source: source,
            line_color: 'red'
        });

        // add the plot to a document and display it
        var doc = new Bokeh.Document();
        doc.add_root(p);
        var div = document.getElementById("plotTitleSlide");
        Bokeh.embed.add_document_standalone(doc, div);

        for (var i = 0; i <= M; i += 1) {
                x.push(i);
                y.push(50 * ( Math.random() * ( .1 ) + 0.9 ) );
            }
        y[50] = 75
        y[49] = 25


        // repeat
        var i = 0
        var text = null
        setInterval(function(){
            if ( i == 100 ) {
                setTimeout(function() {
                    text = text ? text : p.text({x:50,
                        y:10,
                        text: 'Press SPC to continue',
                        text_align: 'center',
                        text_font_size: '14pt',
                        text_font: 'Courier'
                    })
                }, 1000)
            }

            if (i > 100) {

                setTimeout(function() {
                    i = 0
                }, 3000)
            }
            i = i + 1
            source.data.x = x.slice(0, i)
            source.data.y = y.slice(0, i)
            source.trigger('change')
        }, 50)

    }


    exports.titlePlot = titlePlot
    exports.largeDataPlot = largeDataPlot

}(window.plots = window.plots || {}));
