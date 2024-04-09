import mermaid, { UnknownDiagramError } from 'mermaid';
import React, {Component, createRef} from 'react'; 
import { unknown } from 'zod';




interface MermaidProps {
    code: string;
}

class Mermaid extends React.Component<MermaidProps> {

    private mermaidRef = createRef<HTMLDivElement>();

    componentDidMount() {
        void this.renderMermaid();
    }

    componentDidUpdate(prevProps: MermaidProps, prevState: unknown){
        if (prevProps.code !== this.props.code) {
            document?.getElementById('mermaid-chart')?.removeAttribute('data-processed');
            void this.renderMermaid();
        }
        
    }
    async renderMermaid() {
        const { code } = this.props;   
        if( code === undefined) { 
                
        }
        if (this.mermaidRef.current) {
            console.log(code)
            try{ 
                if(code === undefined) {
                    void mermaid.parse("")
                    this.mermaidRef.current.innerHTML = "";
                    void mermaid.initialize({startOnLoad: true});
                    void await mermaid.run(); 
                }
                else{ 
                    void mermaid.parse(code);
                    this.mermaidRef.current.innerHTML = code;
                    void mermaid.initialize({startOnLoad: true});
                    void await mermaid.run();
                }
                
            
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
            <div className="mermaid-container h-full w-full flex font-semibold font-mono items-center align-middle justify-center content-center" onWheel={this.handleZoom} >
            <div id="mermaid-chart" className='mermaid' ref={this.mermaidRef}>
                {this.props.code}
            </div>
            </div>
        ) 
    }
}


export default Mermaid;