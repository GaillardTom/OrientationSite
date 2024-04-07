import mermaid from 'mermaid';
import React, {Component, createRef} from 'react'; 




interface MermaidProps {
    code: string;
}

class Mermaid extends React.Component<MermaidProps> {

    private mermaidRef = createRef<HTMLDivElement>();

    componentDidMount() {
        this.renderMermaid();
    }

    componentDidUpdate(prevProps: MermaidProps, prevState: unknown){
        if (prevProps.code !== this.props.code) {
            document?.getElementById('mermaid-chart')?.removeAttribute('data-processed');
            this.renderMermaid();
        }
        
    }
    renderMermaid() {
        const { code } = this.props;   
        if (this.mermaidRef.current) {
            try{ 
                void mermaid.parse(code);
                this.mermaidRef.current.innerHTML = code;
                void mermaid.initialize({startOnLoad: true});
                void mermaid.run();
            
            } 
            catch (e) {
                console.error(e);
            } 
        }
    }
           
    handleZoom = (event: React.WheelEvent<HTMLDivElement>) => {
    if (this.mermaidRef.current) {
      const scaleAmount = 0.1;
      const container = this.mermaidRef.current;
    //   event.preventDefault();

      let scale = Number(container.getAttribute("data-scale")) || 1;

      if (event.deltaY < 0) {
        // Zoom in
        scale += scaleAmount;
      } else {
        // Zoom out
        scale -= scaleAmount;
      }

      // Limit scale for practicality
      scale = Math.min(Math.max(0.1, scale), 5);

      container.style.transform = `scale(${scale})`;
      container.setAttribute("data-scale", scale.toString());
    }
    };


    render() {
        return ( 
            <div className="mermaid-container" onWheel={this.handleZoom} >
            <div id="mermaid-chart" className='mermaid' ref={this.mermaidRef}>
                {this.props.code}
            </div>
            </div>
        ) 
    }
}


export default Mermaid;