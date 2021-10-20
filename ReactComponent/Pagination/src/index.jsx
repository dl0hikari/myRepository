import React, {Component} from 'react';
import style from './index.module.scss';

class Pagination extends Component {
    constructor(props) {
        super(props);
        this.state = {
            count: this.props.count ? this.props.count : 1,
            offset: this.props.offset ? this.props.offset : 7, // 中间显示多少个数字按钮
            pagesArr: [],
            showStartEllipsis: false,
            showEndEllipsis: false,
            startEllipsis: false,
            endEllipsis: false,
            showCharacter: false
        }
        this.onClick = this.onClick.bind(this);
        this.pageRender = this.pageRender.bind(this);

    }

    onClick(page) {
        this.props.onClick(page)
    }

    componentDidMount() {
        this.pageRender(this.props.page)
    }

    componentWillReceiveProps(nextProps, nextContext) {
        this.pageRender(nextProps.page)
    }

    pageRender(page) {
        const {count, offset} = this.state;
        let arr = [];
        if(count >= 1) {
            if(count <= offset) {
                for(let i=1; i<=count; i++) {
                  arr.push(i);
                }
            }else{
                let startPageIndex = page +  Math.floor(offset / 2);

                if(startPageIndex >= offset) {
                    startPageIndex = Math.min(startPageIndex, count);

                    if(startPageIndex < count) {
                        this.setState({endEllipsis: true});
                    } else {
                        this.setState({endEllipsis: false});
                    }

                    for (let i = offset; i >= 1 ; i--) {
                        arr.push(startPageIndex--);
                    }
                    arr.reverse();

                    if(startPageIndex > 0) {
                        this.setState({startEllipsis: true});
                    }else{
                        this.setState({startEllipsis: false});
                    }

                } else {
                    for(let i=1; i<=offset; i++) {
                        arr.push(i);
                    }

                    this.setState({
                        startEllipsis: false,
                        endEllipsis: true
                    })
                }
            }
            this.setState({pagesArr: arr});
        }
    }

    render() {
        return (
            <div className={`${style.root} ${this.props.customClassName}`}>
                <span className={style.firstPage} onClick={()=> this.onClick(1)}>首页</span>
                <span className={style.prePage} onClick={()=> this.onClick(Math.max(1, this.props.page - 1))}>上一页</span>
                {this.state.startEllipsis && <span>...</span>}
                {this.state.pagesArr.map((item, index) => (
                    <span key={index} className={`${style.page} ${this.props.page === item ? style.action : ''}`} onClick={()=> this.onClick(item)}>{item}</span>
                    )
                )}
                {this.state.endEllipsis && <span>...</span>}
                <span className={style.nextPage} onClick={()=> this.onClick(Math.min(this.state.count, this.props.page + 1))}>下一页</span>
                <span className={style.lastPage} onClick={()=> this.onClick(this.state.count)}>尾页</span>
                {this.state.showCharacter && `当前第${this.props.page}页`}
            </div>
        );
    }
}

export default Pagination;
