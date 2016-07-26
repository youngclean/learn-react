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
        // if (param.kw == '') {
        //     this.componentDidMount(param);
        //     return;
        // }
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
                <input type="text" placeholder="Search..." className="search-input" onInput={this.handleChange}/>
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
        var rows = [];
        var lastCategory = null;
        datas.map(function(item) {
            if (item.category !== lastCategory) {
                rows.push(<ProductCategoryRow category={item.category} />);
            }
            rows.push(<Product data={item} />);
            lastCategory = item.category;
        });
        if (this.props.isSearch) {
            return (
                <div className="product-list">
                   <p>搜索结果：{len}</p>
                   {rows}
                </div>
            );
        } else {
            return (
                <div className="product-list">
                   {rows}
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
        var name = data.stocked ? data.name : <span style={{color: 'red'}}>{data.name}</span>;
        return (
            <div className="row">
                <span>{name}</span>
                <span>{data.price}</span>
            </div>
        );
    }
});
var ProductCategoryRow = React.createClass({
    render: function() {
        var data = this.props.category;
        return (
            <p className="category">{data}</p>
        );
    }
});
ReactDOM.render(
    <ProductBox url="/api/search"/>,
    document.getElementById('content')
);