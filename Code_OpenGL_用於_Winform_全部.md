
TechOpenGLGlfw.cpp
```cpp
#include "FormMain.h"
int main(void)
{
    System::Windows::Forms::Application::Run(gcnew TechOpenGLGlfw::FormMain());
    return 0;
}
```

FormMain.h
```cpp
#pragma once

namespace TechOpenGLGlfw {

	using namespace System;
	using namespace System::ComponentModel;
	using namespace System::Collections;
	using namespace System::Windows::Forms;
	using namespace System::Data;
	using namespace System::Drawing;

	/// <summary>
	/// FormMain 的摘要
	/// </summary>
	public ref class FormMain : public System::Windows::Forms::Form
	{
	public:
		FormMain(void)
		{
			InitializeComponent();
			//
			//TODO:  在此加入建構函式程式碼
			//
		}

	protected:
		/// <summary>
		/// 清除任何使用中的資源。
		/// </summary>
		~FormMain()
		{
			if (components)
			{
				delete components;
			}
		}
	private: System::Windows::Forms::PictureBox^ pictureBox1;
	protected:

	private:
		/// <summary>
		/// 設計工具所需的變數。
		/// </summary>
		System::ComponentModel::Container ^components;

#pragma region Windows Form Designer generated code
		/// <summary>
		/// 此為設計工具支援所需的方法 - 請勿使用程式碼編輯器修改
		/// 這個方法的內容。
		/// </summary>
		void InitializeComponent(void)
		{
			this->pictureBox1 = (gcnew System::Windows::Forms::PictureBox());
			(cli::safe_cast<System::ComponentModel::ISupportInitialize^>(this->pictureBox1))->BeginInit();
			this->SuspendLayout();
			// 
			// pictureBox1
			// 
			this->pictureBox1->Location = System::Drawing::Point(12, 12);
			this->pictureBox1->Name = L"pictureBox1";
			this->pictureBox1->Size = System::Drawing::Size(110, 66);
			this->pictureBox1->TabIndex = 0;
			this->pictureBox1->TabStop = false;
			this->pictureBox1->Paint += gcnew System::Windows::Forms::PaintEventHandler(this, &FormMain::pictureBox1_Paint);
			// 
			// FormMain
			// 
			this->AutoScaleDimensions = System::Drawing::SizeF(8, 15);
			this->AutoScaleMode = System::Windows::Forms::AutoScaleMode::Font;
			this->ClientSize = System::Drawing::Size(282, 253);
			this->Controls->Add(this->pictureBox1);
			this->Name = L"FormMain";
			this->Text = L"FormMain";
			this->Load += gcnew System::EventHandler(this, &FormMain::FormMain_Load);
			(cli::safe_cast<System::ComponentModel::ISupportInitialize^>(this->pictureBox1))->EndInit();
			this->ResumeLayout(false);

		}
#pragma endregion
	private: System::Void FormMain_Load(System::Object^ sender, System::EventArgs^ e);
	private: System::Void pictureBox1_Paint(System::Object^ sender, System::Windows::Forms::PaintEventArgs^ e);
	};
}

```

```cpp
#include "FormMain.h"
#include "openGLHelper.hpp"

System::Void TechOpenGLGlfw::FormMain::FormMain_Load(System::Object^ sender, System::EventArgs^ e)
{
	initOpenGL(pictureBox1);
	glClearColor(1, 0, 0, 1);

	return System::Void();
}

System::Void TechOpenGLGlfw::FormMain::pictureBox1_Paint(System::Object^ sender, System::Windows::Forms::PaintEventArgs^ e)
{
	glClear(GL_COLOR_BUFFER_BIT|GL_DEPTH_BUFFER_BIT);
	glBegin(GL_TRIANGLES);
		glColor3ub(255, 0, 0);
		glVertex3f(0, 0, 0);
		glColor3ub(0, 255, 0);
		glVertex3f(0.5, 0, 0);
		glColor3ub(0, 0, 255);
		glVertex3f(0, 0.5, 0);
	glEnd();
	glFlush();

	// swap buffer
	auto hdc = getHDC(pictureBox1);
	::SwapBuffers(hdc);
	releaseHDC(pictureBox1, hdc);

	return System::Void();
}

```

OpenGLHelper.hpp
```cpp
#pragma once
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
inline void releaseHDC(System::Windows::Forms::Control^ canvasOfGLRender, HDC hdc) {
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
```
