var ProductBox = React.createClass({
    render: function() {
        return (
            <div className="product-box">
               <SearchInputBox onSearchSumbit={this.handleSubmit}/>
               <ProductListHead />
               <ProductListBox data={this.state.data} isSearch={this.state.isSearch}/>
            </div>
        );
    },
    handleSubmit: function(param) {
        if (param.kw == '') {
            this.componentDidMount();
            return;
        }
        $.ajax({
            url: this.props.url,
            dataType: 'json',
            type: 'POST',
            data: param,
            success: function(data) {
                this.setState({
                    data: data,
                    isSearch: true
                });
            }.bind(this),
            error: function(xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
    },
    getInitialState: function() {
        return {
            data: [],
            isSearch: false
        };
    },
    componentDidMount: function() {
        $.ajax({
            url: this.props.url,
            dataType: 'json',
            cache: false,
            success: function(data) {
                this.setState({
                    data: data,
                    isSearch: false
                });
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
            stocked: 0,
            kw: ''
        };
    },
    handleChange: function(e) {
        var kw = e.target.value.trim();
        this.setState({
            kw: kw
        });
        this.props.onSearchSumbit({
            kw: kw,
            stocked: this.state.stocked
        });
    },
    handleCheck: function(e) {
        var checked = e.target.checked ? 1 : 0;
        this.setState({
            stocked: checked
        });

        this.props.onSearchSumbit({
            kw: this.state.kw,
            stocked: checked
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
        var datas = this.props.data;
        var len = datas.length;
        var productNodes = datas.map(function(item) {
            return (
                <Product data={item} />
            );
        });
        if (this.props.isSearch) {
            return (
                <div className="product-list">
                   <p>搜索结果：{len}</p>
                   {productNodes}
                </div>
            );
        } else {
            return (
                <div className="product-list">
                   {productNodes}
                </div>
            )
        }
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
    <ProductBox url="/api/search"/>,
    document.getElementById('content')
);