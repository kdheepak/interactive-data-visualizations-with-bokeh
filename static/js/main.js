(function (exports) {

    var plt = Bokeh.Plotting;

    // set up some data
    var M = 100;
    var x = [];
    var y = [];
    var colors = [];
    var radii = [];
    for (var i = 0; i <= M; i += 1) {
            x.push(i);
            y.push(i * ( Math.random() * ( .2 ) + 0.9 ) );
        }

    // create a data source
    var source = new Bokeh.ColumnDataSource({
        data: {x: x, y: y}
    });

    // make the plot and add some tools
    var tools = "pan,wheel_zoom,box_zoom,reset,save";
    var p = plt.figure({width: 400, height: 400, tools: tools,
        x_range: new Bokeh.DataRange1d({start: -5.0, end: 105.0}),
        y_range: new Bokeh.DataRange1d({start: -5.0, end: 105.0})
    });
    // p.x_range._initial_start = -5
    // p.x_range._initial_end = 105
    // p.y_range._initial_start = -5
    // p.y_range._initial_end = 105

    // call the circle glyph method to add some circle glyphs
    var line = p.line({ field: "x" }, { field: "y" }, {
        source: source,
        line_color: null
    });

    // add the plot to a document and display it
    var doc = new Bokeh.Document();
    doc.add_root(p);
    var div = document.getElementById("plotTitleSlide");
    Bokeh.embed.add_document_standalone(doc, div);

    var i = 0

    setInterval(function(){
        if (i > 100) {
            setTimeout(function() {
                i = 0
            }, 1000)
        }
        i = i + 1
        source.data.x = x.slice(0, i)
        source.data.y = y.slice(0, i)
        source.trigger('change')
    }, 50)



}(window.slides = window.slides || {}));
