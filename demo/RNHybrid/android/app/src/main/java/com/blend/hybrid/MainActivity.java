package com.blend.hybrid;

import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.RadioGroup;

import androidx.appcompat.app.AppCompatActivity;


public class MainActivity extends AppCompatActivity {

    /**
     * Returns the name of the main component registered from JavaScript. This is used to schedule
     * rendering of the component.
     */
    // @Override
    // protected String getMainComponentName() {
    //     return "NewBlendRN";
    // }

    private EditText input, paramInput;
    private boolean useMode2;
    private Button jump;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        input = findViewById(R.id.input);
        paramInput = findViewById(R.id.paramInput);
        jump = findViewById(R.id.jump);

        RadioGroup radioGroup = findViewById(R.id.radioGroup);
        radioGroup.setOnCheckedChangeListener(new RadioGroup.OnCheckedChangeListener() {
            @Override
            public void onCheckedChanged(RadioGroup group, int checkedId) {
                if (checkedId == R.id.mode1) {
                    useMode2 = false;
                } else if (checkedId == R.id.mode2) {
                    useMode2 = true;
                }
            }
        });

        jump.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                doJump();
            }
        });
    }

    private void doJump() {
        String moduleName = input.getText().toString().trim();
        String inputParams = paramInput.getText().toString().trim();
        if (useMode2) {
            RNPageActivity.start(this, moduleName, inputParams);
        } else {
            ReactPageActivity.start(this, moduleName, inputParams);
        }
    }

}
