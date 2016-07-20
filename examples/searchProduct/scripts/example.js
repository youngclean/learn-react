var ProductBox = React.createClass({
    render: function() {
        return (
            <div className="product-box">
               <SearchInputBox onSearchSumbit={this.handleSubmit}/>
               <ProductListHead />
               <div id="productList"></div>
            </div>
        );
    },
    handleSubmit: function(param) {
        $.ajax({
            url: this.props.url,
            dataType: 'json',
            // type: 'POST',
            data: param,
            success: function(data) {
                ReactDOM.render(<ProductListBox data={data} />,
                    document.getElementById('productList')
                );
            }.bind(this),
            error: function(xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });

    }
});
var SearchInputBox = React.createClass({
    getInitialState: function() {
        return {
            stocked: false
        };
    },
    handleChange: function(e) {
        var kw = e.target.value.trim();
        if (kw == '') {
            return;
        }
        this.props.onSearchSumbit({
            kw: kw,
            stocked: this.state.stocked
        });
    },
    handleCheck: function(e) {
        this.setState({
            stocked: e.target.checked
        });
    },
    render: function() {
        return (
            <div className="search-box">
                <input type="text" placeholder="Search..." className="search-input" onBlur={this.handleChange}/>
                <label className="search-tip">
                    <input type="checkbox" onClick={this.handleCheck}/>Only show products in stock
                </label>
            </div>
        );
    }
});
var ProductListBox = React.createClass({
    render: function() {
        console.log(this.props.data);
        var productNodes = this.props.data.map(function(item) {
            return (
                <Product data={item} />
            );
        });
        return (
            <div className="product-list">
           {productNodes}
           </div>
        );

    }
});
var ProductListHead = React.createClass({
    render: function() {
        return (
            <div className="list-head">
              <span>Name</span><span>Price</span>
            </div>
        );
    }
});
var Product = React.createClass({
    render: function() {
        var data = this.props.data;
        return (
            <div>
                <p>{data.category}</p>
                <p>
                    <span>{data.name}</span>
                    <span>{data.price}</span>
                </p>
            </div>
        );
    }
});
ReactDOM.render(
    <ProductBox url="/search"/>,
    document.getElementById('content')
);