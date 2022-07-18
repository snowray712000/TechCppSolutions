```cpp=
#include <exception>
#include <string>
#include <GL/glew.h>
#include <GL/wglew.h>
#include <Windows.h>
#pragma comment(lib,"opengl32.lib")
#pragma comment(lib,"glew32s.lib")
#pragma comment(lib,"user32.lib")
#pragma comment(lib,"gdi32.lib")

HGLRC MySetPixelFormat(HDC hdc)
{
	PIXELFORMATDESCRIPTOR pfd = {
		sizeof(PIXELFORMATDESCRIPTOR),    // size of this pfd 
		1,                                // version number 
		PFD_DRAW_TO_WINDOW |              // support window 
		PFD_SUPPORT_OPENGL |              // support OpenGL 
		PFD_DOUBLEBUFFER,                 // double buffered 
		PFD_TYPE_RGBA,                    // RGBA type 
		24,                               // 24-bit color depth 
		0, 0, 0, 0, 0, 0,                 // color bits ignored 
		0,                                // no alpha buffer 
		0,                                // shift bit ignored 
		0,                                // no accumulation buffer 
		0, 0, 0, 0,                       // accum bits ignored 
		32,                               // 32-bit z-buffer     
		0,                                // no stencil buffer 
		0,                                // no auxiliary buffer 
		PFD_MAIN_PLANE,                   // main layer 
		0,                                // reserved 
		0, 0, 0                           // layer masks ignored 
	};

	GLint  iPixelFormat;

	// get the device context's best, available pixel format match 
	if ((iPixelFormat = ChoosePixelFormat(hdc, &pfd)) == 0)
	{
		throw std::exception("ChoosePixelFormat Failed");
		return 0;
	}

	// make that match the device context's current pixel format 
	if (SetPixelFormat(hdc, iPixelFormat, &pfd) == FALSE)
	{
		throw std::exception("SetPixelFormat Failed");
		return 0;
	}

	HGLRC glrc = 0;
	if ((glrc = wglCreateContext(hdc)) == NULL)
	{
		throw std::exception("wglCreateContext Failed");
	}

	return glrc;
}

inline HDC getHDC(System::Windows::Forms::Control^ canvasOfGLRender) {
	return ::GetDC((HWND)canvasOfGLRender->Handle.ToPointer());
}
inline void releaseHDC(System::Windows::Forms::Control^ canvasOfGLRender,HDC hdc) {
    ::ReleaseDC((HWND)canvasOfGLRender->Handle.ToPointer(), hdc);
}


void initOpenGL(System::Windows::Forms::Control^ canvasOfGLRender) {
    using namespace System::IO;
    using namespace System::Windows::Forms;
    
	HDC hdc = getHDC(canvasOfGLRender);
	HGLRC hglrc = MySetPixelFormat(hdc);
	wglMakeCurrent(hdc, hglrc);

	// 首先，若還沒 make current，呼叫 glewInit 會錯誤，會出現 GL Version Missing
	auto er = glewInit();
	if (er != GLEW_OK) {
		std::string er1 = (const char*)glewGetErrorString(er);
		throw new std::exception(er1.c_str());
	}
	else {
		const GLubyte* renderer = glGetString(GL_RENDERER);
		const GLubyte* version = glGetString(GL_VERSION);
		printf("Renderer: %s\n", renderer);
		printf("OpenGL version %s\n", version);
	}
}

// 範例: 使用時
// Panel 要設為 Opaque，不然會閃爍。 (但卻要用建構子才能使用下面這行)
// SetStyle(ControlStyles.Opaque, true);
void form_Load(){
    initOpenGL(panel);
    Invalidate();
    panel->Invalidate();
    
}
void panel_Paint(){
    // render
    
    HDC hdc = getHDC(panel);
    ::SwapBuffers(hdc);
    releaseHDC(panel,hdc);
}
void panel_Resize(){
    auto cx = panel->Width;
    auto cy = panel->Height;
    glViewport(0,0,cx,cy);
    panel->Invalidate();
}
